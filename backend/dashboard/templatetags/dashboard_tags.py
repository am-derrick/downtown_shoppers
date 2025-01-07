from django import template

register = template.Library()

@register.filter
def status_color(status):
    colors = {
        'submitted': 'primary',
        'processing': 'warning',
        'quoted': 'info',
        'accepted': 'success',
        'declined': 'danger',
        'completed': 'secondary'
    }
    return colors.get(status, 'secondary')