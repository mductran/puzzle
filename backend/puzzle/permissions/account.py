from rest_framework import permissions
from puzzle.models.account import Account


class AccountDetailsPermission(permissions.BasePermission):
    """
    Only admin or matching Id can view
    """
    def has_object_permission(self, request, view, obj):
        try:
            account = Account.objects.get(user__id=request.user.id)
            if account.profile == "adm":
                return True
            if obj.profile == "sto" or obj.profile == "reg":
                return request.user.id == obj.user.id
        except Account.DoesNotExist:
            return False
