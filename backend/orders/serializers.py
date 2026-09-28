from rest_framework import serializers
from .models import Coupon, Order, OrderItem


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = [
            "id",
            "code",
            "discount_rate",
            "discount_amount",
            "free_shipping",
            "min_order_amount",
            "description",
            "is_active",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    item_total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "product_name",
            "size",
            "color",
            "price",
            "quantity",
            "image_url",
            "item_total",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_number",
            "full_name",
            "phone",
            "email",
            "address",
            "city",
            "pincode",
            "payment_method",
            "payment_status",
            "order_status",
            "subtotal",
            "discount_amount",
            "shipping_fee",
            "total_amount",
            "coupon_code",
            "notes",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "order_number", "order_status", "created_at", "updated_at"]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        if not validated_data.get("order_number"):
            validated_data["order_number"] = Order.generate_order_number()

        request = self.context.get("request")
        if request and hasattr(request, "user") and request.user.is_authenticated:
            validated_data["user"] = request.user

        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order
