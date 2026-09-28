from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CouponViewSet,
    OrderViewSet,
    OrderCreateView,
    MyOrdersView,
    validate_coupon,
)

router = DefaultRouter()
router.register("coupons", CouponViewSet, basename="coupon")
router.register("history", OrderViewSet, basename="order_history")

urlpatterns = [
    path("coupons/validate/", validate_coupon, name="coupon_validate"),
    path("create/", OrderCreateView.as_view(), name="order_create"),
    path("my-orders/", MyOrdersView.as_view(), name="my_orders"),
    path("", include(router.urls)),
]
