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


@view_config(route_name='delete_user', renderer='json', request_method='DELETE')
def delete_user(request):
    user_id = request.matchdict.get('id')
    user = DBSession.query(User).get(user_id)

    if not user:
        return Response(json_body={'status': 'error', 'message': 'User not found'}, status=404)

    with transaction.manager:
        DBSession.delete(user)

    return {'status': 'success', 'message': f'User {user_id} deleted'}

def includeme(config):
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    config.add_route('delete_user', '/api/users/{id}')
    config.scan(__name__)
