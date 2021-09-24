from django.db import models


class Inventory(models.Model):
    class Meta:
        ordering = ["id"]

    account = models.ForeignKey("Account", on_delete=models.CASCADE)
    puzzle = models.ForeignKey("Puzzle", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    public = models.BooleanField(default=True)
