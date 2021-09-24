from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.db import models


class Account(models.Model):
    class Profile(models.TextChoices):
        regular = 'reg', _('regular')
        store = 'sto', _('store')
        staff = 'stf', _('staff')
        admin = 'adm', _('admin')

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.TextField(
        max_length=3,
        choices=Profile.choices
    )
