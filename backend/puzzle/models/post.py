from django.db import models


class Post(models.Model):
    class Meta:
        ordering = ["updated"]

    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("Account", on_delete=models.CASCADE)
    collage = models.ForeignKey("Collage", on_delete=models.CASCADE)
