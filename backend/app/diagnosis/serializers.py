from rest_framework import serializers
from .models import Disease, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class DiseaseSerializer(serializers.ModelSerializer):
    # tags = TagSerializer(many=True)

    class Meta:
        model = Disease
        fields = ('id', 'name', 'description', 'image')
