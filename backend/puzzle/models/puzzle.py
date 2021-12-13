from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Puzzle(models.Model):
    class Meta:
        ordering = ["id"]

    class Condition(models.TextChoices):
        brand_new = "new", _("new")
        missing_pieces = "msp", _("missing pieces")
        sealed = "sld", _("sealed")

    name = models.CharField(max_length=255)

    box_condition = models.TextField(
        max_length=3,
        choices=Condition.choices
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    material = models.CharField(max_length=20)
    collage = models.ForeignKey("Collage", on_delete=models.CASCADE)
