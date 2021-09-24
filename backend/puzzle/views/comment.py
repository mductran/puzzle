from rest_framework.viewsets import ModelViewSet
from puzzle.models import Comment
from puzzle.serializers import CommentSerializer
from puzzle.permissions import PostsAndCommentsPermissions
# Create your views here.


class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [PostsAndCommentsPermissions, ]
