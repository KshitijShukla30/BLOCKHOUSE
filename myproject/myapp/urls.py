from django.urls import path
from .views import candlestick_data, line_chart_data, bar_chart_data, pie_chart_data

urlpatterns = [
    path('api/candlestick-data/', candlestick_data),
    path('api/line-chart-data/', line_chart_data),
    path('api/bar-chart-data/', bar_chart_data),
    path('api/pie-chart-data/', pie_chart_data),

]
