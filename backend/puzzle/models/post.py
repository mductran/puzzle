from django.db import models


class Post(models.Model):
    class Meta:
        ordering = ["updated"]

    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    image = models.URLField(blank=True, null=True)
    author = models.ForeignKey("Account", on_delete=models.CASCADE)
