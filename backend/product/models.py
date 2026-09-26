from django.db import models
from django.urls import reverse


class Category(models.Model):
    category_name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    category_image = models.ImageField(
        upload_to="category/",
        blank=True,
        null=True
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["category_name"]

    def __str__(self):
        return self.category_name

    def get_url(self):
        return reverse("products_by_category", args=[self.slug])


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )
    product_name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    product_image = models.ImageField(
        upload_to="products/"
    )
    stock = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.product_name

    def get_url(self):
        return reverse("product_detail", args=[self.category.slug, self.slug])


class Variation(models.Model):

    VARIATION_TYPES = (
        ("size", "Size"),
        ("color", "Color"),
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variations"
    )

    variation_category = models.CharField(
        max_length=20,
        choices=VARIATION_TYPES
    )

    variation_value = models.CharField(max_length=100)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "product",
            "variation_category",
            "variation_value",
        )

    def __str__(self):
        return f"{self.product.product_name} - {self.variation_category}: {self.variation_value}"