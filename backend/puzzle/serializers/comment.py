from rest_framework import serializers
from puzzle.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Comment
        fields = ["id", "content", "created", "updated", "author_id", "post_id"]

    def create(self, validated_data):
        print('\nVALIDATED DATA: ', validated_data)
        comment_instance = Comment.objects.create(**validated_data)
        return comment_instance
