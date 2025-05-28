from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import Base, DBSession, User
from pyramid.authentication import BasicAuthAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy

def check_credentials(username, password, request):
    user = DBSession.query(User).filter_by(username=username).first()
    if user and user.password == password:
        return str(user.id) 
    return None

def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    
    config = Configurator(settings=settings)
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')

    config.add_tween('backend.cors.cors_tween_factory')

    config.include('.views')
    config.include('pyramid_jinja2')
    config.include('.models')
    
    config.scan()
    return config.make_wsgi_app()
