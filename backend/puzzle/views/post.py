from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from puzzle.models import Post
from puzzle.serializers import PostSerializer
from puzzle.permissions import PostsAndCommentsPermissions
# Create your views here.


class PostView(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [PostsAndCommentsPermissions, ]
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['content', 'author__user__username', ]
    ordering_fields = ['updated', ]