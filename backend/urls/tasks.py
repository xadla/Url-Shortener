from celery import shared_task


from .serializers import CreateUrlSerializer


@shared_task
def create_short_url(data):
    serializer = CreateUrlSerializer(data=data)
    if serializer.is_valid():
        print("serializer is valid")
        instance = serializer.save()
        return {
            'id': instance.id,
            'original_url': instance.original_url,
            'short_url': instance.short_url,
            'created_at': instance.created_at.isoformat(),
            'visits': instance.visits,
        }
    print("serializer is invalid: ", serializer.errors)
    return {
        'errors': serializer.errors,
        'valid': False
    }
