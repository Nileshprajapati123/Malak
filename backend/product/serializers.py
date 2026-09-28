from rest_framework import serializers
from .models import Category, Product, Variation


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "category_name",
            "slug",
            "description",
            "category_image",
            "is_active",
        ]


class VariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = [
            "id",
            "variation_category",
            "variation_value",
            "is_active",
        ]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )
    variations = VariationSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "slug",
            "category",
            "category_id",
            "description",
            "price",
            "product_image",
            "stock",
            "is_available",
            "created_at",
            "updated_at",
            "variations",
        ]
        read_only_fields = [
            "id",
            "slug",
            "category",
            "variations",
            "created_at",
            "updated_at",
        ]