from rest_framework import serializers
from puzzle.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    def get_author_name(self, obj):
        return obj.author.user.username

    class Meta:
        model = Comment
        fields = ["id", "content", "created", "updated", "author_name"]
