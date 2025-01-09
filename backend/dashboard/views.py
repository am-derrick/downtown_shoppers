from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from shopping.models import ShoppingList, Quote, ShoppingItem
from django.utils import timezone
from django.contrib import messages
from django.db.models import Count, Q
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login
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
            messages.error(request, 'Invalid username or passowrd.')

    if request.user.is_authenticated:
        return redirect('dashboard:home')
    
    return render(request, 'dashboard/login.html')

@login_required
def dashboard_home(request):
    """Dashbaord hompage with overview statistics"""
    context = {
        'new_lists': ShoppingList.objects.filter(status='submitted').count(),
        'processing_lists': ShoppingList.objects.filter(status='processing').count(),
        'quoted_lists': ShoppingList.objects.filter(status='quoted').count(),
        'recent_lists': ShoppingList.objects.all().order_by('-created_at')[:5],
        'expiring_quotes': Quote.objects.filter(
            status='pending',
            expires_at__gt=timezone.now()
        ).order_by('expires_at')[:5]
    }
    return render(request, 'dashboard/home.html', context)

@login_required
def shopping_list_view(request):
    """View showing all shopping lists with filters"""
    status = request.GET.get('status', '')
    lists = ShoppingList.objects.annotate(
        priced_items_count=Count('items', filter=Q(items__price_added=True)),
        total_items_count=Count('items')
    )

    if status:
        lists = lists.filter(status=status)

    paginator = Paginator(lists.order_by('-created_at'), 15)
    page = request.GET.get('page')
    lists = paginator.get_page(page)

    # Add page range with ellipsis
    page_range = get_page_range(lists)

    status_choices = ShoppingList._meta.get_field('status').choices

    context = {
        'lists': lists,
        'current_status': status,
        'status_choices': status_choices,
        'page_range': page_range
    }
    return render(request, 'dashboard/lists/list.html', context)

@login_required
def shopping_list_detail(request, pk):
    """View showing processing of individual shopping list"""
    shopping_list = get_object_or_404(ShoppingList, pk=pk)

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
                    messages.error(request, f'Erro updating price: {str(e)}')
            
            else:
                messages.error(request, 'Missing item ID or pirice')
        
    context = {
            'shopping_list': shopping_list,
            'items_priced': shopping_list.items.filter(price_added=True).count(),
            'total_items': shopping_list.items.count()
        }
    
    return render(request, 'dashboard/lists/detail.html', context)
    
@login_required
def create_quote(request, list_id):
    """View to create or update quote for a shopping list"""
    shopping_list = get_object_or_404(ShoppingList, pk=list_id)

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
            expires_at=timezone.now() + timezone.timedelta(days=1) # 24 hours
        )

        shopping_list.status ='quoted'
        shopping_list.save()

        messages.success(request, 'Quote created successfully')
        return redirect('dashboard:list_detail', pk=list_id)
    
    context = {
        'shopping_list': shopping_list,
        'items_total': sum(float(item.actual_price or 0) for item in shopping_list.items.all())
    }
    return render(request, 'dashboard/quotes/create.html', context)

@login_required
def quote_list(request):
    """View all quotes with filters"""
    status = request.GET.get('status', '')
    quotes = Quote.objects.all()

    if status:
        quotes = quotes.filter(status=status)

    context = {
        'quotes': quotes.order_by('-created_at'),
        'current_status': status,
        'status_choices': Quote._meta.get_field('status').choices,
        'now': timezone.now()
    }
    return render(request, 'dashboard/quotes/list.html', context)