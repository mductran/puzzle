from django.db import models


class Image(models.Model):
    class Meta:
        ordering = ["id"]

    url = models.URLField()
    caption = models.CharField(max_length=200)
    collage = models.ForeignKey("Collage", on_delete=models.CASCADE)
