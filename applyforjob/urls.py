"""applyforme URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from .import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'applyforjob'
# handler404 = '.views.handler_404'
urlpatterns = [
   path('', views.home, name='home'),
   path('ads.txt/', views.googleads, name='home'),
   path('filter/', views.filtervalue, name='filtervalue'),
   path('account_history/', views.account_history, name='account_history'),
   path('login/', views.loginview, name='account_login'),
   path('verify_email/', views.verify_email, name='verify_email'),
#    path('verify_email/<str:token>/', views.verify_email, name='verify_email_token'),
   path('signup/', views.signup, name='signup'),
   path('signup/<str:refcode>', views.signupref, name='signupref'),
   path('ajax/validate_username/', views.validate_username, name='validate_username'),
   path('latest-jobs/<slug:slug>/',views.jobdetail,name='jobdetail'),
   path('apply/<slug:slug>/',views.applythis,name='applythis'),
   path('jobnotifications/<slug:slug>/',views.jobnotifictionsview,name='jobnotifictionsurl'),
   path('unapply/',views.unapply,name='unapply'),
   path('answering/',views.answeringview,name='answeringview'),
   path('newapply/',views.newapply,name='newapply'),
   path('applyfinal/',views.applyfinal,name='applyfinal'),
   path('appliedjobs/',views.appliedjobsview,name='appliedjobs'),
   path('appliedjobs/<slug:slug>/',views.applieddetail,name='applieddetail'),
# 
   
   path('updates/',views.latest_updates,name='updates'),
   path('balance/',views.adding_balance,name='add_balance'),
   path('apply_coupon/',views.apply_coupon,name='apply_coupon'),
   path('cash_out/',views.cash_out,name='cash_out'),
   path('how_to_earn/',views.how_to_earn,name='how_to_earn'),
   path('policies/',views.ourpolicies,name='ourpolicies'),
   
#    path('uploadcv/<slug:slug>',views.uploadcv,name='uploadcv'),
   path('mycv/<slug:slug>/',views.mydata, name='mycv'),
   path('data_varification/',views.data_varification, name='data_varification'),
   
#    path('datasaving/',views.savedata, name='savedata'),
   


   path("uploadcv/",views.ajax_file_upload, name='uploadcv'),
   path("ajax_file_upload_save",views.ajax_file_upload_save),
   path("expcertupload",views.expcertupload),
   path("personaldata/",views.personeldata, name='personeldata'),
   
   path('education/',views.educationdata, name='educationdata'),
   path('education/matric',views.matricdata, name='matricdata'),
   path('education/inter',views.interdata, name='matricdata'),
   path('education/bachelor',views.bachelordata, name='bachelordata'),
   path('education/master',views.masterdata, name='masterdata'),
   path('education/mphil',views.mphildata, name='mphildata'),
   path('education/doctor',views.doctordata, name='doctordata'),
   path('education/experience',views.experiencedata, name='experiencedata'),
   path('education/expe_del',views.expe_del, name='expe_del'),
   path('education/edit/',views.personaldata, name='personaldata'),
   path('captcha/', include('captcha.urls')),

 

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
