from django.urls import path
from . import views


urlpatterns = [
    path('follow/<username>/', views.follow),
    path('<username>/', views.profile),
    path('like/<int:movie_id>/', views.like_movie),
    path('<username>/mvti/', views.mvti_test),
]