from pyramid.response import Response

def cors_tween_factory(handler, registry):
    def cors_tween(request):
        # Handle preflight request (OPTIONS)
        if request.method == 'OPTIONS':
            response = Response()
        else:
            response = handler(request)
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })
        return response
    return cors_tween
