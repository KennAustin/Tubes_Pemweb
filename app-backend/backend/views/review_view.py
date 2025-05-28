from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from ..models import DBSession, Review
import transaction


@view_config(route_name='reviews', renderer='json', request_method='GET')
def get_reviews(request):
    user_id = request.params.get('user_id')
    if not user_id:
        return Response(json_body={'status': 'error', 'message': 'User ID is required'}, status=400)

    reviews = DBSession.query(Review).filter(Review.user_id == user_id).all()

    return {
        'status': 'success',
        'reviews': [
            {
                'id': r.id,
                'song_id': r.song_id,
                'song_name': r.song_name,
                'artist_name': r.artist_name,
                'album_image_url': r.album_image_url,
                'rating': r.rating,
                'comment': r.comment,
                'user_id': r.user_id,
            } for r in reviews
        ]
    }


@view_config(route_name='reviews', renderer='json', request_method='POST')
def add_review(request):
    data = request.json_body

    song_id = data.get('song_id')
    song_name = data.get('song_name')
    artist_name = data.get('artist_name')
    album_image_url = data.get('album_image_url')
    rating = data.get('rating')
    comment = data.get('comment')
    user_id = data.get('user_id')

    if not all([song_id, song_name, artist_name, rating, comment, user_id]):
        return Response(json_body={'status': 'error', 'message': 'All fields are required'}, status=400)

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        return Response(json_body={'status': 'error', 'message': 'Rating must be an integer'}, status=400)

    if not (1 <= rating <= 5):
        return Response(json_body={'status': 'error', 'message': 'Rating must be between 1 and 5'}, status=400)

    review = Review(
        song_id=song_id,
        song_name=song_name,
        artist_name=artist_name,
        album_image_url=album_image_url,
        rating=rating,
        comment=comment,
        user_id=user_id
    )

    try:
        with transaction.manager:
            DBSession.add(review)
            DBSession.flush()

            review_data = {
                'id': review.id,
                'song_id': review.song_id,
                'song_name': review.song_name,
                'artist_name': review.artist_name,
                'album_image_url': review.album_image_url,
                'rating': review.rating,
                'comment': review.comment,
                'user_id': review.user_id,
            }

        return {
            'status': 'success',
            'message': 'Review added',
            'review': review_data
        }
    except IntegrityError:
        return Response(json_body={'status': 'error', 'message': 'Failed to add review'}, status=500)



@view_config(route_name='review_detail', renderer='json', request_method='DELETE')
def delete_review(request):
    try:
        review_id = int(request.matchdict.get('id'))
    except (TypeError, ValueError):
        return Response(json_body={'status': 'error', 'message': 'Invalid review ID'}, status=400)

    review = DBSession.query(Review).filter(Review.id == review_id).first()
    if not review:
        return Response(json_body={'status': 'error', 'message': 'Review not found'}, status=404)

    try:
        with transaction.manager:
            DBSession.delete(review)
        return {'status': 'success', 'message': 'Review deleted'}
    except Exception as e:
        return Response(json_body={'status': 'error', 'message': str(e)}, status=500)

def includeme(config):
    config.add_route('reviews', '/api/reviews')
    config.add_route('review_detail', '/api/reviews/{id}')