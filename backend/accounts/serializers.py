from rest_framework import serializers
from .models import Account
from rest_framework_simplejwt.serializers import TokenBlacklistSerializer


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    password2 = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = Account
        fields = [
            "username",
            "email",
            "password",
            "password2",
            "phone",
            "address",
            "city",
            "state",
            "country",
            "pincode",
            "gender",
            "profile_image",
        ]

    def validate_username(self, value):
        if Account.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):
        if Account.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({
                "password": "Passwords do not match."
            })

        return data

    def create(self, validated_data):
        validated_data.pop("password2")

        password = validated_data.pop("password")

        user = Account.objects.create_user(
            password=password,
            **validated_data
        )

        return user


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "address",
            "city",
            "state",
            "country",
            "pincode",
            "gender",
            "profile_image",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "username",
            "created_at",
            "updated_at",
        ]


class LogoutSerializer(TokenBlacklistSerializer):
    pass