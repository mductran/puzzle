from rest_framework import serializers
from puzzle.models import Post

from .comment import CommentSerializer


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    image = serializers.URLField(source="image.url", read_only=True)
    caption = serializers.CharField(source="image.caption", read_only=True)
    comments = CommentSerializer(source="comment_set", read_only=True, many=True)
    
    def get_author_name(self, obj):
        return obj.author.user.username

    class Meta:
        model = Post
        fields = ["id", "author_name", "content", "created", "updated", "image", "caption", "comments"]
        # fields = "__all__"
