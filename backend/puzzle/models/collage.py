from django.db import models


class Collage(models.Model):
    class Meta:
        ordering = ["id"]

    image = models.ForeignKey("Image", on_delete=models.CASCADE)
    puzzle = models.ForeignKey("Puzzle", on_delete=models.CASCADE)
