from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Puzzle(models.Model):
    class Meta:
        ordering = ["id"]

    class Outline(models.TextChoices):
        rectangular = "rec", _("rectangle")
        square = "sqr", _("square")
        round = "rnd", _("round")

    class PieceShape(models.TextChoices):
        traditional = "tra", _("traditional")
        custom = "cus", _("custom")
    
    class Condition(models.TextChoices):
        brand_new = "new", _("new")
        complete = "com", _("complete")
        missing_pieces = "mis", _("missing pieces")
        sealed = "sea", _("sealed")

    name = models.CharField(max_length=255)
    pieces = models.IntegerField()
    size_width = models.IntegerField()
    size_height = models.IntegerField()

    outline = models.TextField(
        max_length=3,
        choices=Outline.choices,
    )
    piece_shape = models.TextField(
        max_length=3,
        choices=PieceShape.choices
    )
    box_condition = models.TextField(
        max_length=3,
        choices=Condition.choices
    )

    created = models.DateTimeField(auto_now_add=True)

    theme = models.ForeignKey("Theme", on_delete=models.CASCADE)
    brand = models.ForeignKey('Brand', on_delete=models.CASCADE)
