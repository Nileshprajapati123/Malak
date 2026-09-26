from django.contrib import admin
from .models import Category, Product, Variation


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "category_name",
        "slug",
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("category_name",)
    }

    list_filter = ("is_active",)
    search_fields = ("category_name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "product_name",
        "category",
        "price",
        "stock",
        "is_available",
        "created_at",
    )

    prepopulated_fields = {
        "slug": ("product_name",)
    }

    list_filter = (
        "category",
        "is_available",
    )

    search_fields = (
        "product_name",
        "description",
    )


@admin.register(Variation)
class VariationAdmin(admin.ModelAdmin):
    list_display = (
        "product",
        "variation_category",
        "variation_value",
        "is_active",
    )

    list_filter = (
        "variation_category",
        "is_active",
    )

    search_fields = (
        "product__product_name",
        "variation_value",
    )