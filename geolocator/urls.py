from django.contrib import admin
from django.urls import path
from django.views.static import serve
from django.conf import settings
from django.urls import include
from geolocator.views import *

urlpatterns = [
    path('', index,name='index'),
    
]