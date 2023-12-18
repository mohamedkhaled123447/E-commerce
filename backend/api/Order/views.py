from django.shortcuts import redirect, render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
import stripe
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from Cart.models import CartProduct
from Order.serializers import OrderSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY
endpoint_secret = settings.STRIPE_ENDPOINT_SECRET
# Create your views here.


class ListOrders(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        querySet = Order.objects.all()
        if user is not None:
            querySet = querySet.filter(user=user)
        return querySet


class CreateOrder(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroyOrder(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.query_params.get("user", None)
        querySet = Order.objects.all()
        if user is not None:
            querySet = querySet.filter(user=user)
        return querySet


class createCheckoutSession(APIView):
    def post(self, request, *args, **kwargs):
        total_price = request.data["total_price"]
        try:
            checkout_session = stripe.checkout.Session.create(
                customer_email="moham35356@gmial.com",
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        "price_data": {
                            "currency": "usd",
                            "unit_amount": 100 * total_price,
                            "product_data": {
                                "name": "USD",
                            },
                        },
                        "quantity": 1,
                    },
                ],
                metadata={"user": request.user.id, "total_price": total_price, "status": "completed"},
                mode="payment",
                success_url="http://localhost:3001/",
                cancel_url="http://localhost:3000/profile/",
            )
        except Exception as e:
            return Response({"error": str(e)})

        return Response(checkout_session.url)


@csrf_exempt
def my_webhook_view(request):
    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    event = None
    # with open("payload.json", "w") as f:
    #     json.dump(json.loads(payload), f)  # Save payload as JSON
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        # with open("event.json", "w") as f:
        #     json.dump(event.to_dict(), f)
        serializer = OrderSerializer(data=event.data.object.metadata)
        if serializer.is_valid():
            serializer.save()
        else:
            print("Error1")
        try:
            user = event.data.object.metadata.user
            CartProduct.objects.filter(user=user).delete()
        except:
            print("Error2")
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Passed signature verification
    return HttpResponse(status=200)
