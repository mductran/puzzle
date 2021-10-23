from django.db import models


class Comment(models.Model):
    class Meta:
        ordering = ["updated"]

    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    author = models.ForeignKey("Account", on_delete=models.CASCADE)
