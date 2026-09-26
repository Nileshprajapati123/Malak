from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account


@admin.register(Account)
class AccountAdmin(UserAdmin):

    list_display = (
        "username",
        "email",
        "phone",
        "city",
        "state",
        "is_active",
        "is_staff",
        "created_at",
    )

    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
        "gender",
        "city",
    )

    search_fields = (
        "username",
        "email",
        "phone",
        "city",
        "state",
    )

    ordering = ("-created_at",)

    fieldsets = UserAdmin.fieldsets + (
        ("Personal Information", {
            "fields": (
                "phone",
                "address",
                "city",
                "state",
                "country",
                "pincode",
                "gender",
                "profile_image",
            )
        }),
        ("Timestamps", {
            "fields": (
                "created_at",
                "updated_at",
            )
        }),
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )