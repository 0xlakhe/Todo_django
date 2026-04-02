from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TaskSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )

    category_details = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "completed",
            "created_at",
            "category",
            "category_details",
        ]

    def validate_category(self, value):
        if value and value.owner != self.context["request"].user:
            raise serializers.ValidationError("You dont own this category!")
        return value
