from django.urls import path, include
from rest_framework.routers import DefaultRouter
# pyrefly: ignore [missing-import]
from .views import (
    HeroBannerViewSet,
    CustomerReviewViewSet,
    StyleLookbookViewSet,
    WishlistViewSet,
)

router = DefaultRouter()
router.register("banners", HeroBannerViewSet, basename="banner")
router.register("reviews", CustomerReviewViewSet, basename="review")
router.register("lookbooks", StyleLookbookViewSet, basename="lookbook")
router.register("wishlist", WishlistViewSet, basename="wishlist")

urlpatterns = [
    path("", include(router.urls)),
]
