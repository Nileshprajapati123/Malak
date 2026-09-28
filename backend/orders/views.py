from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone

from .models import Coupon, Order
from .serializers import CouponSerializer, OrderSerializer


class CouponViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Coupon.objects.filter(is_active=True)
    serializer_class = CouponSerializer
    pagination_class = None
    permission_classes = [AllowAny]


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def validate_coupon(request):
    code = request.data.get("code") or request.query_params.get("code")
    if not code:
        return Response({"valid": False, "detail": "Coupon code is required."}, status=status.HTTP_400_BAD_REQUEST)

    code = code.strip().upper()
    try:
        coupon = Coupon.objects.get(code__iexact=code, is_active=True)
        if coupon.valid_until and coupon.valid_until < timezone.now():
            return Response({"valid": False, "detail": "This coupon has expired."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "valid": True,
            "code": coupon.code,
            "discount_rate": float(coupon.discount_rate),
            "discount_amount": float(coupon.discount_amount),
            "free_shipping": coupon.free_shipping,
            "min_order_amount": float(coupon.min_order_amount),
            "description": coupon.description,
        })
    except Coupon.DoesNotExist:
        # Hardcoded recognized store coupons for instant fallback
        if code == "MALAK50":
            return Response({
                "valid": True,
                "code": "MALAK50",
                "discount_rate": 0.50,
                "discount_amount": 0.0,
                "free_shipping": False,
                "description": "50% Royal Festive Discount",
            })
        elif code == "FIRST10":
            return Response({
                "valid": True,
                "code": "FIRST10",
                "discount_rate": 0.10,
                "discount_amount": 0.0,
                "free_shipping": False,
                "description": "10% Welcome Discount",
            })
        elif code == "FREESHIP":
            return Response({
                "valid": True,
                "code": "FREESHIP",
                "discount_rate": 0.0,
                "discount_amount": 0.0,
                "free_shipping": True,
                "description": "Free Express Shipping",
            })
        return Response({"valid": False, "detail": "Invalid or inactive coupon code."}, status=status.HTTP_404_NOT_FOUND)


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(
            {
                "success": True,
                "message": "Order placed successfully!",
                "order_number": order.order_number,
                "total_amount": float(order.total_amount),
                "order": OrderSerializer(order, context={"request": request}).data,
            },
            status=status.HTTP_201_CREATED,
        )


class MyOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)
