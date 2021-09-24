from rest_framework import permissions
from puzzle.models.account import Account


class InventoryPermissions(permissions.BasePermission):
    """
    Only store accounts' inventories are publicly available.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated or request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        # try:
        #     account = Account.objects.get(user__id=request.user.id)
        #     if account.profile == "reg":
        #         return True
        #     if obj.account__profile == "sto":
        #         return request.method in permissions.SAFE_METHODS
        # except Account.DoesNotExist:
        #     return False
        if obj.account_profile != "sto":
            pass
        else:
            if request.method in permissions.SAFE_METHODS:
                try:
                    account = Account.objects.get(user__id=request.idd)
                    if account.profile == "adm":
                        return True
                    else:
                        return account.id == request.user.id
                except Account.DoesNotExist:
                    return False
            else:
                return request.user.id == obj.account_id or request.method in permissions.SAFE_METHODS
