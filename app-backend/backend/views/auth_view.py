from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from ..models import DBSession
from ..models.user import User
import transaction

@view_config(route_name='register', renderer='json', request_method='POST')
def register(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password') 

    if not username or not password:
        return Response(json_body={'status': 'error', 'message': 'Username and password required'}, status=400)

    user = User(username=username, password=password)

    try:
        with transaction.manager:
            DBSession.add(user)
        return {'status': 'success', 'message': 'User registered'}
    except IntegrityError:
        return Response(json_body={'status': 'error', 'message': 'Username already exists'}, status=409)


@view_config(route_name='login', renderer='json', request_method='POST')
def login(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return Response(json_body={'status': 'error', 'message': 'Username and password required'}, status=400)

    user = DBSession.query(User).filter_by(username=username).first()

    if user and user.password == password:
        return {'status': 'success', 'message': 'Login successful', 'user_id': user.id}
    else:
        return Response(json_body={'status': 'error', 'message': 'Invalid credentials'}, status=401)

def includeme(config):
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    config.scan(__name__)
