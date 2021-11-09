from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from puzzle.models import Post
from puzzle.serializers import PostSerializer
from puzzle.permissions import PostsAndCommentsPermissions

from puzzle.models import Account
# Create your views here.


class PostView(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [PostsAndCommentsPermissions, ]
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['content', 'author__user__username', ]
    ordering_fields = ['updated', ]

    def create(self, request, *args, **kwargs):
        print('POST REQUEST DATA: ', request.data)
        this_serializer = self.get_serializer(data=request.data)
        if this_serializer.is_valid(raise_exception=True):
            try:
                author = Account.objects.get(id=request.data['author_id'])
                data = this_serializer.data
                data['author_id'] = author.user.id
                new_post = Post.objects.create(**data)
                data['author_name'] = author.user.username
                data['id'] = new_post.id
                return Response(data, status=status.HTTP_201_CREATED)
            except (Account.DoesNotExist):
                return Response(status=status.HTTP_400_BAD_REQUEST)
