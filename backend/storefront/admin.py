from django.contrib import admin
# pyrefly: ignore [missing-import]
from .models import HeroBanner, CustomerReview, StyleLookbook, WishlistItem


@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "badge",
        "tag",
        "category_slug",
        "display_order",
        "is_active",
    )
    list_editable = ("display_order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "subtitle", "badge")


@admin.register(CustomerReview)
class CustomerReviewAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "product",
        "rating",
        "city",
        "outfit_name",
        "is_verified",
        "is_featured",
        "created_at",
    )
    list_editable = ("is_featured", "is_verified")
    list_filter = ("rating", "is_featured", "is_verified")
    search_fields = ("name", "city", "outfit_name", "review_text")


@admin.register(StyleLookbook)
class StyleLookbookAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "tag",
        "total_price",
        "category_slug",
        "display_order",
        "is_active",
    )
    list_editable = ("display_order", "is_active")
    list_filter = ("is_active", "tag")
    search_fields = ("title", "description")


@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "created_at")
    search_fields = ("user__username", "product__product_name")
