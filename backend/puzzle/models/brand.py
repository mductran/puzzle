from django.db import models


class Brand(models.Model):
    class Meta:
        ordering = ["id"]

    name = models.TextField()

    def __str__(self):
        return self.name
