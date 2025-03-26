from django.db import models


import string
import random


from accounts.models import User


class Url(models.Model):

    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="urls")
    original_url = models.URLField()
    short_url = models.CharField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    visits = models.IntegerField(default=0)


    def save(self, *args, **kwargs):

        if not self.short_url:
            self.short_url = self.generate_short_url()

        super().save(*args, **kwargs)


    def generate_short_url(self, length=6):

        chars = string.ascii_letters + string.digits
        return "".join(random.choices(chars, k=length))


    def __str__(self):

        return f"{self.author.username} - {self.original_url[:30]}"
