from rest_framework import serializers
from puzzle.models import Post

from .comment import CommentSerializer
from .collage import CollageSerializer


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.user.username", read_only=True)
    comments = CommentSerializer(source="comment_set", read_only=True, many=True)
    collage = CollageSerializer(source="collage", read_only=True)

    class Meta:
        model = Post
        fields = ["id", "author_name", "content", "created", "updated", "collage", "comments"]

    def create(self, validated_data):
        post_instance = Post.objects.create(**validated_data)
        return post_instance
