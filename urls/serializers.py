from rest_framework import serializers


from .models import Url
from accounts.models import User


class CreateUrlSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    class Meta:
        model = Url
        fields = ['original_url', 'short_url', 'created_at', 'visits', 'username']

    def validate(self, attrs):
        username = attrs.get('username')

        try:
            author = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError({"username": "This username does not exist!"})

        attrs['author'] = author

        if Url.objects.filter(original_url=attrs["original_url"]).exists():
            raise serializers.ValidationError({"original_url": "This URL is shorted before!"})

        return attrs

    def create(self, validated_data):
        url = Url.objects.create(
            author=validated_data['author'],
            original_url=validated_data['original_url']
        )
        return url
