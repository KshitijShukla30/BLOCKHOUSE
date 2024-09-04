from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def candlestick_data(request):
    try:
        data = {
            "data": [
                {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
                # Add more data points here
            ]
        }
        return JsonResponse(data)
    except Exception as e:
        logger.error(f"Error in candlestick_data: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
def line_chart_data(request):
    try:
        data = {
            "labels": ["Jan", "Feb", "Mar", "Apr"],
            "data": [10, 20, 30, 40]
        }
        return JsonResponse(data)
    except Exception as e:
        logger.error(f"Error in line_chart_data: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
def bar_chart_data(request):
    try:
        data = {
            "labels": ["Product A", "Product B", "Product C"],
            "data": [100, 150, 200]
        }
        return JsonResponse(data)
    except Exception as e:
        logger.error(f"Error in bar_chart_data: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
def pie_chart_data(request):
    try:
        data = {
            "labels": ["Red", "Blue", "Yellow"],
            "data": [300, 50, 100]
        }
        return JsonResponse(data)
    except Exception as e:
        logger.error(f"Error in pie_chart_data: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)