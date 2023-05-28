from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


# Create your models here.
class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    like_movies = models.TextField()


class UserMvti(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    actionparam = models.IntegerField()
    comedyparam = models.IntegerField()
    dramaparam = models.IntegerField()
    fantasyparam = models.IntegerField()
    romanceparam = models.IntegerField()
    sfparam = models.IntegerField()
    thrillerparam = models.IntegerField()




