from django.contrib.auth import authenticate


from rest_framework import serializers


from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["full_name", "username"]


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["full_name", "username", "password", "password2"]
        extra_kwargs = {'password': {'write_only': True}}

    # This is for save method
    def create(self, validated_data):
        validated_data.pop("password2")

        user = User.objects.create_user(
            full_name=validated_data["full_name"],
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

    # This is for is_valid method
    def validate(self, attrs):
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({"username": "This Username is already in use."})

        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords must match!"})

        return attrs


class UserTokenSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)

    def validate(self, attrs):

        user = authenticate(username=attrs["username"], password=attrs["password"])

        if not user:
            raise serializers.ValidationError("Username and Password does not match")

        attrs["user"] = user
        return attrs
