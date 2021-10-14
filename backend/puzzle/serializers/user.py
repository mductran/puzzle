from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import ugettext as _

import re


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        read_only_fields = ["id"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = User(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance

    def validate_password(self, value):
        number_pattern = '\d'
        uppercase_pattern = '[A-Z]'
        lowercase_pattern = '[a-z]'
        special_chars_pattern = '[()[\]{}|\\`~!@#&*_\-+=;:\'",./?]'
        illegal_chars_pattern = '[<>$%^]'

        if not re.findall(number_pattern, value):
            raise ValidationError(
                _("Your password must contain at least 1 digit, 0-9."),
                code='password_no_number',
            )

        if not re.findall(uppercase_pattern, value):
            raise ValidationError(
                _("Your password must contain at least 1 uppercase letter, A-Z."),
                code='password_no_upper',
            )

        if not re.findall(lowercase_pattern, value):
            raise ValidationError(
                _("Your password must contain at least 1 lowercase letter, a-z."),
                code='password_no_lower',
            )

        if not re.findall(special_chars_pattern, value):
            raise ValidationError(
                _("Your password must contain at least 1 special character"),
                code='password_no_symbol',
            )

        if re.findall(illegal_chars_pattern, value):
            raise ValidationError(
                _("Your password must not contain any of " + illegal_chars_pattern),
                code='password_illegal_symbol',
            )

        return value
