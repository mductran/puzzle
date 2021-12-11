from django.db import models

class Offer(models.Model):
    class Meta:
        ordering = ["created"]
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("Account", on_delete=True)
    trade = models.ForeignKey("Trade", on_delete=models.CASCADE)
    note = models.TextField()
