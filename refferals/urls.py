
from django.contrib import admin
from django.urls import path
from django.urls import include
from . import views
from django.conf import settings
from django.conf.urls.static import static




from django.contrib import admin
from django.urls import path
from .views import main_view
from refferals.views import my_recommendations_view


app_name = 'refferals'
urlpatterns = [
    path('', views.reffer, name='reffer'),
    path('earnings/', views.earnings, name='earnings'),
    # path('profiles/', my_recommendations_view, name='my-recs-view'),
    path('<str:ref_code>/', main_view, name='main-view'),


]