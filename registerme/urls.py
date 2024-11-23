
from django.contrib import admin
from django.urls import path
from django.urls import include
from . import views
from django.conf import settings
from django.conf.urls.static import static


app_name = 'registerme'
urlpatterns = [
   path('', views.staff, name='staff'),
   path('accountant/', views.accountant, name='accountant'),
   path('complains/', views.complaints, name='complaints'),
   path('feedback/', views.feedback, name='feedback'),
   path('request-a-work/',views.requesting,name='requesting'),
   path('auddit/', views.auddit, name='auddit'),
   path('today/', views.today_entry, name='today_entry'),
   path('experiment/', views.experimental_page, name='experimental_page'),
   path('forwhatsapp/', views.forwhatsapp, name='forwhatsapp'),
   path('accounting/', views.accounting, name='accounting'),
   path('startingreg/',views.registerationstarted,name='startingreg'),
   path('asking/',views.askingview,name='askingview'),
   path('userweb/',views.userwebview,name='userwebview'),
   path('slipsupload/',views.slipsuploadview,name='slipsuploadview'),
   path('answering/',views.answeringview,name='answeringview'),
   path('steptaken/',views.steptakenview,name='steptakenview'),
   

]