class DomainRoutingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host()
        
        if host.startswith('admin.'):
            # If accessing admin domain and URL starts with /dashboard
            if request.path.startswith('/dashboard/'):
                # Remove /dashboard prefix
                request.path = request.path[10:]
                request.path_info = request.path_info[10:]
        
        return self.get_response(request)
