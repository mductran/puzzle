from rest_framework import permissions
from puzzle.models.account import Account


class PostsAndCommentsPermissions(permissions.BasePermission):
    """
    Apply for both comments and posts.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated or request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        """
        Admin can do anything except modify comment.
        """
        try:
            account = Account.objects.get(user__id=request.user.id)
            if account.profile == "reg":
                return True
            return request.user.id == obj.author_id or request.method in permissions.SAFE_METHODS
        except Account.DoesNotExist:
            return request.method in permissions.SAFE_METHODS
