from django.db import models
from django.conf import settings
from product.models import Product


class HeroBanner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    badge = models.CharField(max_length=100, default="ROYAL FESTIVE & WEDDING 2026")
    tag = models.CharField(max_length=50, default="FLAT 50% OFF")
    category_slug = models.CharField(max_length=100, default="all")
    bg_image = models.ImageField(upload_to="banners/", blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    accent_color = models.CharField(max_length=30, default="#d4af37")
    cta_text = models.CharField(max_length=50, default="Explore Collection")
    cta_link = models.CharField(max_length=200, default="#catalog-section")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "Hero Banner"
        verbose_name_plural = "Hero Banners"

    def __str__(self):
        return self.title

    @property
    def image(self):
        if self.bg_image:
            return self.bg_image.url
        return self.image_url or ""


class CustomerReview(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviews"
    )
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100, default="India")
    avatar = models.ImageField(upload_to="reviews/", blank=True, null=True)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)
    rating = models.PositiveIntegerField(default=5)
    outfit_name = models.CharField(max_length=200, blank=True)
    review_text = models.TextField()
    is_verified = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Customer Review"
        verbose_name_plural = "Customer Reviews"

    def __str__(self):
        return f"{self.name} - {self.rating}★ ({self.outfit_name})"

    @property
    def avatar_src(self):
        if self.avatar:
            return self.avatar.url
        return self.avatar_url or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"


class StyleLookbook(models.Model):
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=100, default="Wedding & Sangeet")
    description = models.TextField()
    image = models.ImageField(upload_to="lookbooks/", blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    pieces = models.JSONField(
        default=list,
        blank=True,
        help_text="List of pieces included in the look, e.g. ['Velvet Sherwani', 'Chanderi Stole']"
    )
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    category_slug = models.CharField(max_length=100, default="festive-wedding")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "Style Lookbook"
        verbose_name_plural = "Style Lookbooks"

    def __str__(self):
        return self.title

    @property
    def image_src(self):
        if self.image:
            return self.image.url
        return self.image_url or ""


class WishlistItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wishlist_items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="wishlisted_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")
        ordering = ["-created_at"]
        verbose_name = "Wishlist Item"
        verbose_name_plural = "Wishlist Items"

    def __str__(self):
        return f"{self.user.username} - {self.product.product_name}"
