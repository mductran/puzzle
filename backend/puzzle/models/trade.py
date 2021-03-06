from django.db import models

class Trade(models.Model):
    class Meta:
        ordering = ["updated"]
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("Account", on_delete=models.CASCADE)
    item = models.ForeignKey("Puzzle", on_delete=models.CASCADE)
    note = models.TextField()
    closed = models.BooleanField(default=False)
