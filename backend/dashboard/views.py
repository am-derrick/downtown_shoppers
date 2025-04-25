from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from shopping.models import ShoppingList, Quote, ShoppingItem
from django.utils import timezone
from dashboard.utils import get_eat_time
from django.contrib import messages
from django.db.models import Count, Q
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from dashboard.utils import get_page_range


def login_view(request):
    """login view"""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard:home')
        else:
            messages.error(request, 'Invalid username or password.')

    if request.user.is_authenticated:
        return redirect('dashboard:home')
    
    return render(request, 'dashboard/login.html')


def logout_view(request):
    """Logs out user and redirects to login page"""
    logout(request)
    messages.success(request, 'You have been successfully logged out.')
    return redirect('dashboard:login')


@login_required
def dashboard_home(request):
    """Dashboard homepage with overview statistics"""
    current_time = get_eat_time()

    context = {
        'new_lists': ShoppingList.objects.filter(status='submitted').count(),
        'processing_lists': ShoppingList.objects.filter(status='processing').count(),
        'quoted_lists': ShoppingList.objects.filter(status='quoted').count(),
        'recent_lists': ShoppingList.objects.all().order_by('-created_at')[:5],
        'expiring_quotes': Quote.objects.filter(
            status='pending',
            expires_at__gt=current_time
        ).order_by('expires_at')[:5]
    }
    return render(request, 'dashboard/home.html', context)


@login_required
def archive_list(request, pk):
    """view to archive (soft delete) shopping list"""
    if request.method == 'POST':
        shopping_list = get_object_or_404(ShoppingList, pk=pk)
        shopping_list.is_active = False
        shopping_list.deleted_at = get_eat_time()
        shopping_list.save()
        messages.success(request, 'Shopping list archived successfully')
    return redirect('dashboard:lists')


@login_required
def unarchive_list(request, pk):
    """view to restore (unarchive) shopping list"""
    if request.method == 'POST':
        shopping_list = get_object_or_404(ShoppingList, pk=pk)
        shopping_list.unarchive()
        messages.success(request, 'Shopping list restored successfully')
    return redirect('dashboard:lists')


@login_required
def shopping_list_view(request):
    """View showing all shopping lists with filters"""
    status = request.GET.get('status', '')
    show_archived = request.GET.get('show_archived') == 'on'

    lists = ShoppingList.objects.annotate(
        priced_items_count=Count('items', filter=Q(items__price_added=True)),
        total_items_count=Count('items')
    )

    # Filter based on archive status
    if not show_archived:
        lists = lists.filter(is_active=True)  # Only show active lists
    
    if status:
        lists = lists.filter(status=status)

    paginator = Paginator(lists.order_by('-created_at'), 10)
    page = request.GET.get('page')
    lists = paginator.get_page(page)

    page_range = get_page_range(lists)
    status_choices = ShoppingList._meta.get_field('status').choices

    context = {
        'lists': lists,
        'current_status': status,
        'status_choices': status_choices,
        'page_range': page_range,
        'show_archived': show_archived
    }
    return render(request, 'dashboard/lists/list.html', context)


@login_required
def shopping_list_detail(request, pk):
    """View showing processing of individual shopping list"""
    shopping_list = get_object_or_404(ShoppingList, pk=pk)
    
    # Get the quote safely
    try:
        quote = shopping_list.quote
    except Quote.DoesNotExist:
        quote = None

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'start_processing':
            shopping_list.status = 'processing'
            shopping_list.save()
            messages.success(request, 'List marked as processing')

        elif action == 'mark_priced':
            item_id = request.POST.get('item_id')
            price = request.POST.get('price')

            if item_id and price:
                try:
                    item = shopping_list.items.get(id=item_id)
                    item.actual_price = price
                    item.price_added = True
                    item.save()
                    messages.success(request, f'Price updated for {item.name}')

                except (ShoppingItem.DoesNotExist, ValueError) as e:
                    messages.error(request, f'Error updating price: {str(e)}')
            
            else:
                messages.error(request, 'Missing item ID or price')
        
    context = {
        'shopping_list': shopping_list,
        'items_priced': shopping_list.items.filter(price_added=True).count(),
        'total_items': shopping_list.items.count(),
        'quote': quote
    }
    
    return render(request, 'dashboard/lists/detail.html', context)
    

@login_required
def create_quote(request, list_id):
    """View to create or update quote for a shopping list"""
    shopping_list = get_object_or_404(ShoppingList, pk=list_id)

    # Check for existing quote
    try:
        existing_quote = shopping_list.quote
        if existing_quote:
            messages.warning(request, 'A quote already exists for this list. Redirecting to edit.')
            return redirect('dashboard:edit_quote', quote_id=existing_quote.id)
    except Quote.DoesNotExist:
        pass

    if request.method == 'POST':
        subtotal = sum(float(item.actual_price or 0) for item in shopping_list.items.all())
        delivery_fee = float(request.POST.get('delivery_fee', 0))
        service_fee = float(request.POST.get('service_fee', 0))
        total = subtotal + delivery_fee + service_fee

        quote = Quote.objects.create(
            shopping_list=shopping_list,
            subtotal=subtotal,
            delivery_fee=delivery_fee,
            service_fee=service_fee,
            total=total,
            expires_at=timezone.now() + timezone.timedelta(hours=8)
        )

        shopping_list.status = 'quoted'
        shopping_list.save()

        messages.success(request, 'Quote created successfully')
        return redirect('dashboard:list_detail', pk=list_id)
    
    context = {
        'shopping_list': shopping_list,
        'items_total': sum(float(item.actual_price or 0) for item in shopping_list.items.all())
    }
    return render(request, 'dashboard/quotes/create.html', context)


@login_required
def edit_quote(request, quote_id):
    """View to edit an existing quote"""
    quote = get_object_or_404(Quote, pk=quote_id)
    shopping_list = quote.shopping_list

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'mark_priced':
            # Handle item price update
            item_id = request.POST.get('item_id')
            price = request.POST.get('price')

            if item_id and price:
                try:
                    item = shopping_list.items.get(id=item_id)
                    item.actual_price = price
                    item.price_added = True
                    item.save()
                    
                    # Update quote subtotal and total after item price change
                    subtotal = sum(float(item.actual_price or 0) for item in shopping_list.items.all())
                    quote.subtotal = subtotal
                    quote.total = subtotal + float(quote.delivery_fee) + float(quote.service_fee)
                    quote.save()
                    
                    messages.success(request, f'Price updated for {item.name}')
                except (ShoppingItem.DoesNotExist, ValueError) as e:
                    messages.error(request, f'Error updating price: {str(e)}')
            return redirect('dashboard:edit_quote', quote_id=quote_id)
        else:
            # Handle delivery and service fee updates
            try:
                delivery_fee = float(request.POST.get('delivery_fee', 0))
                service_fee = float(request.POST.get('service_fee', 0))
                subtotal = sum(float(item.actual_price or 0) for item in shopping_list.items.all())
                total = subtotal + delivery_fee + service_fee

                # Update the quote
                quote.subtotal = subtotal
                quote.delivery_fee = delivery_fee
                quote.service_fee = service_fee
                quote.total = total
                quote.expires_at = timezone.now() + timezone.timedelta(hours=8)  # Reset expiration
                quote.save()

                messages.success(request, 'Quote updated successfully')
                return redirect('dashboard:list_detail', pk=shopping_list.pk)
            except ValueError as e:
                messages.error(request, f'Error updating fees: {str(e)}')
                return redirect('dashboard:edit_quote', quote_id=quote_id)
    
    context = {
        'shopping_list': shopping_list,
        'quote': quote,
        'items_total': sum(float(item.actual_price or 0) for item in shopping_list.items.all())
    }
    return render(request, 'dashboard/quotes/edit.html', context)


@login_required
def archive_quote(request, pk):
    """view to archive (soft delete) quote"""
    if request.method == 'POST':
        quote = get_object_or_404(Quote, pk=pk)
        quote.is_active = False
        quote.deleted_at = get_eat_time()
        quote.save()
        messages.success(request, 'Quote archived successfully')
    return redirect('dashboard:quotes')


@login_required
def unarchive_quote(request, pk):
    """view to restore (unarchive) quote"""
    if request.method == 'POST':
        quote = get_object_or_404(Quote, pk=pk)
        quote.unarchive()
        messages.success(request, 'Quote restored successfully')
    return redirect('dashboard:quotes')


@login_required
def quote_list(request):
    """View all quotes with filters"""
    status = request.GET.get('status', '')
    show_archived = request.GET.get('show_archived') == 'on'

    if show_archived:
        quotes = Quote.objects.all()
    else:
        quotes = Quote.active_quotes.active()

    if status:
        quotes = quotes.filter(status=status)

    paginator = Paginator(quotes.order_by('-created_at'), 10)
    page = request.GET.get('page')
    quotes = paginator.get_page(page)

    current_time = get_eat_time()
    page_range = get_page_range(quotes)

    context = {
        'quotes': quotes,
        'current_status': status,
        'status_choices': Quote._meta.get_field('status').choices,
        'now': current_time,
        'page_range': page_range,
        'show_archived': show_archived
    }
    return render(request, 'dashboard/quotes/list.html', context)

# Test hardcoded data for guadrails
MAX_RETRIES = 7