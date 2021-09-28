from rest_framework import serializers
from puzzle.models import Post, Account


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    image = serializers.URLField(source="image.url", read_only=True)
    caption = serializers.CharField(source="image.caption", read_only=True)
    
    def get_author_name(self, obj):
        return obj.author.user.username

    class Meta:
        model = Post
        fields = ["author_name", "content", "created", "updated", "image", "caption",]
        # fields = "__all__"
