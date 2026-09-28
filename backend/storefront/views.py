from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from .models import HeroBanner, CustomerReview, StyleLookbook, WishlistItem
from .serializers import (
    HeroBannerSerializer,
    CustomerReviewSerializer,
    StyleLookbookSerializer,
    WishlistItemSerializer,
)


class HeroBannerViewSet(viewsets.ModelViewSet):
    queryset = HeroBanner.objects.filter(is_active=True)
    serializer_class = HeroBannerSerializer
    pagination_class = None

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated()]


class CustomerReviewViewSet(viewsets.ModelViewSet):
    queryset = CustomerReview.objects.all()
    serializer_class = CustomerReviewSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["product", "is_featured", "is_verified", "rating"]
    ordering_fields = ["-created_at", "rating"]

    def get_permissions(self):
        if self.action in ["list", "retrieve", "create"]:
            return [AllowAny()]
        return [IsAuthenticated()]


class StyleLookbookViewSet(viewsets.ModelViewSet):
    queryset = StyleLookbook.objects.filter(is_active=True)
    serializer_class = StyleLookbookSerializer
    pagination_class = None

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated()]


class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishlistItem.objects.filter(user=self.request.user)

    @action(detail=False, methods=["post"], url_path="toggle")
    def toggle(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = WishlistItem.objects.get(user=request.user, product_id=product_id)
            item.delete()
            return Response({"action": "removed", "is_wishlisted": False})
        except WishlistItem.DoesNotExist:
            WishlistItem.objects.create(user=request.user, product_id=product_id)
            return Response({"action": "added", "is_wishlisted": True})
