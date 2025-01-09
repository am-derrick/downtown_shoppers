from django.core.paginator import Paginator

def get_page_range(page_obj, show_adjacent=2):
    """Helper function to generate page range with ellipsis"""
    paginator = page_obj.paginator
    current_page = page_obj.number
    total_pages = paginator.num_pages

    page_range = []

    # Includ page 1
    page_range.append(1)

    # Add ellipsis after page 1
    if current_page - show_adjacent > 2:
        page_range.append('...')

    # Add pages around current pages
    for page in range(max(2, current_page - show_adjacent),
                      min(total_pages, current_page + show_adjacent + 1)):
        page_range.append(page)

    # Add ellipsis before last page
    if current_page + show_adjacent < total_pages - 1:
        page_range.append('...')

    # Include last page
    if total_pages > 1 and total_pages not in page_range:
        page_range.append(total_pages)

    return page_range
