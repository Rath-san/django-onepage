from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=50, default="New product!")
    minimal_requirements = models.CharField(max_length=50, default="min req details!")
    source_size = models.IntegerField(default=0)

class MusicPortal(models.Model):
    name = models.CharField(max_length=50, default="Portal name!")

# Create your models here.
class Music(models.Model):
    title = models.CharField(max_length=50, default="music title!")
    url = models.URLField(max_length=200, default="www.google.com")
    used_in_trailer = models.BooleanField(default=False)
    music_portal = models.ForeignKey(MusicPortal, on_delete=models.CASCADE, blank=True, null=True)

    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True)
