from django.contrib import admin
from .models import Coupon, Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product_name", "size", "color", "price", "quantity", "item_total")


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "discount_rate",
        "discount_amount",
        "free_shipping",
        "is_active",
        "valid_until",
    )
    list_editable = ("is_active",)
    list_filter = ("is_active", "free_shipping")
    search_fields = ("code", "description")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_number",
        "full_name",
        "phone",
        "total_amount",
        "payment_method",
        "payment_status",
        "order_status",
        "created_at",
    )
    list_editable = ("payment_status", "order_status")
    list_filter = ("order_status", "payment_status", "payment_method")
    search_fields = ("order_number", "full_name", "phone", "email", "city")
    inlines = [OrderItemInline]
