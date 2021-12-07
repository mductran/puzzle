from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from puzzle.models import Comment, Account, Post
from puzzle.serializers import CommentSerializer
from puzzle.permissions import PostsAndCommentsPermissions
# Create your views here.


class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # TODO: uncomment
    # permission_classes = [PostsAndCommentsPermissions, ]

    def create(self, request, *args, **kwargs):
        this_serializer = self.get_serializer(data=request.data)
        if this_serializer.is_valid(raise_exception=True):
            try:
                post = Post.objects.get(id=request.data['post_id'])
                author = Account.objects.get(user_id=request.data['author_id'])
                data = this_serializer.data
                data['post_id'] = post.id
                data['author_id'] = author.user.id
                new_comment = Comment.objects.create(**data)
                data['author_name'] = new_comment.author.user.username
                return Response(data, status=status.HTTP_201_CREATED)
            except (Account.DoesNotExist, Post.DoesNotExist):
                return Response(status=status.HTTP_400_BAD_REQUEST)
