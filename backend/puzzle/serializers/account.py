from rest_framework import serializers
from puzzle.models import Account
from puzzle.serializers.user import UserSerializer


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Account
        fields = "__all__"

    def create(self, validated_data):
        user_data_serializer = UserSerializer(data=validated_data.pop('user'))
        if user_data_serializer.is_valid():
            user = user_data_serializer.save()
            user_profile = Account.objects.create(
                user=user, **validated_data)
            return user_profile
        print('\n{}\n'.format(user_data_serializer.errors))
        raise user_data_serializer.errors

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super(self.__class__, self).delete(*args, **kwargs)
