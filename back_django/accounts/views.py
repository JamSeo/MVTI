from rest_framework.response import Response
from rest_framework.decorators import api_view

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import UserMvti
from .serializers import UserSerializer, UserMvtiSerializer

# Create your views here.



@api_view(['POST'])
def follow(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    if person != request.user:
        if person.followers.filter(username=request.user.username).exists():
            person.followers.remove(request.user)
        else:
            person.followers.add(request.user)
        serializer = UserSerializer(person)
        return Response(serializer.data)

@api_view(['GET'])
def profile(request, username):
    user = get_object_or_404(get_user_model(), username=username)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
@api_view(['PUT'])
def like_movie(request, movie_id):
    user = get_object_or_404(get_user_model(), username=request.user.username)
    if user.like_movies == '':
        user.like_movies = str(movie_id) + ' '
    else:
        like_movies = list(map(int, user.like_movies.split()))
        if movie_id in like_movies:
            like_movies.remove(movie_id)
        else:
            like_movies.append(movie_id)
        movie_list = ''
        for movie in like_movies:
            movie_list += str(movie) + ' '
        user.like_movies = movie_list
    user.save()
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def mvti_test(request, username):
    if request.method == 'GET':
        username = username
        usermvti = get_object_or_404(UserMvti, user=request.user)
        serializer = UserMvtiSerializer(usermvti)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserMvtiSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    elif request.method == 'DELETE':
        usermvti = get_object_or_404(UserMvti, user=request.user)
        usermvti.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  
