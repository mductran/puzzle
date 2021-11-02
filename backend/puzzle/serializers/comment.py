from rest_framework import serializers
from puzzle.models import Comment
from puzzle.models import Account


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.user.username", read_only=True)
    
    class Meta:
        model = Comment
        fields = ["id", "content", "created", "updated", "author_id", "post_id", "author_name"]

    def create(self, validated_data):
        print('\nVALIDATED DATA: ', validated_data)
        comment_instance = Comment.objects.create(**validated_data)
        return comment_instance
