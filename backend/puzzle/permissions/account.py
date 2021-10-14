from rest_framework import permissions
from puzzle.models.account import Account


class AccountDetailsPermission(permissions.BasePermission):
    """
    Only admin or matching Id can view
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        try:
            account = Account.objects.get(user__id=request.user.id)
            if account.profile == "reg":
                return True
            if obj.account__profile == "sto":
                return request.method in permissions.SAFE_METHODS
        except Account.DoesNotExist:
            return False
