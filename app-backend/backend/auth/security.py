# auth/security.py
from pyramid.session import SignedCookieSessionFactory

def includeme(config):
    # Buat session factory (secret key aman)
    session_factory = SignedCookieSessionFactory('secret_key_rahasia')
    config.set_session_factory(session_factory)