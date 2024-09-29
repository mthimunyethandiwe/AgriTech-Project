from django.shortcuts import render

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product
import json

# This view will handle the POST request for adding a new product
@csrf_exempt  # Disable CSRF protection for simplicity
def add_product(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON request
            data = json.loads(request.body)

            # Create the new product using the parsed data
            product = Product.objects.create(
                name=data['name'],
                category=data['category'],
                price=data['price']
            )

            # Return a JSON response with the product details
            return JsonResponse({
                'name': product.name,
                'category': product.category,
                'price': product.price
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
