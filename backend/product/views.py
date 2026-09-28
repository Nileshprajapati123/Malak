from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Category, Product, Variation
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    VariationSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["category_name", "description"]
    filterset_fields = ["is_active"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "category",
        "category__slug",
        "is_available",
    ]
    search_fields = [
        "product_name",
        "description",
        "category__category_name",
    ]
    ordering_fields = [
        "price",
        "created_at",
        "product_name",
    ]

    def get_queryset(self):
        qs = Product.objects.all()
        category_slug = self.request.query_params.get("category_slug")
        if category_slug and category_slug != "all":
            qs = qs.filter(category__slug=category_slug)
        return qs


class VariationViewSet(viewsets.ModelViewSet):
    queryset = Variation.objects.all()
    serializer_class = VariationSerializer
    filterset_fields = ["product", "variation_category", "is_active"]