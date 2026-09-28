from rest_framework import serializers
from product.serializers import ProductSerializer
from product.models import Product
# pyrefly: ignore [missing-import]
from .models import HeroBanner, CustomerReview, StyleLookbook, WishlistItem


class HeroBannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HeroBanner
        fields = [
            "id",
            "title",
            "subtitle",
            "badge",
            "tag",
            "category_slug",
            "bg_image",
            "image_url",
            "image",
            "accent_color",
            "cta_text",
            "cta_link",
            "display_order",
            "is_active",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.bg_image:
            if request:
                return request.build_absolute_uri(obj.bg_image.url)
            return obj.bg_image.url
        return obj.image_url or ""


class CustomerReviewSerializer(serializers.ModelSerializer):
    avatar_display = serializers.SerializerMethodField()
    product_name = serializers.CharField(source="product.product_name", read_only=True)

    class Meta:
        model = CustomerReview
        fields = [
            "id",
            "product",
            "product_name",
            "name",
            "city",
            "avatar",
            "avatar_url",
            "avatar_display",
            "rating",
            "outfit_name",
            "review_text",
            "is_verified",
            "is_featured",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def get_avatar_display(self, obj):
        request = self.context.get("request")
        if obj.avatar:
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return obj.avatar_src


class StyleLookbookSerializer(serializers.ModelSerializer):
    image_display = serializers.SerializerMethodField()

    class Meta:
        model = StyleLookbook
        fields = [
            "id",
            "title",
            "tag",
            "description",
            "image",
            "image_url",
            "image_display",
            "pieces",
            "total_price",
            "category_slug",
            "display_order",
            "is_active",
        ]

    def get_image_display(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_src


class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = WishlistItem
        fields = [
            "id",
            "product",
            "product_id",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        return WishlistItem.objects.create(user=user, **validated_data)
