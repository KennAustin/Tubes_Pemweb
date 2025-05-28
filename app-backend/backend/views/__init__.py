from .review_view import includeme as review_includeme
from .auth_view import includeme as auth_includeme

def includeme(config):
    review_includeme(config)
    auth_includeme(config)
