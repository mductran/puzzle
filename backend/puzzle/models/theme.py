from django.db import models


class Theme(models.Model):
    class Meta:
        ordering = ["id"]
    
    name = models.TextField()
