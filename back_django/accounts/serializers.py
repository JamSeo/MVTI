from rest_framework import serializers
from .models import User, UserMvti


class UserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()

    def get_followers(self, obj):
        return obj.followers.values_list('username', flat=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'followers', 'followings', 'like_movies', 'date_joined']


class UserMvtiSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserMvti
        fields = ['actionparam', 'comedyparam','dramaparam','fantasyparam','romanceparam','sfparam','thrillerparam',]
        read_only_fields = ('user', )

