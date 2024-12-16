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
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf import settings
from django.conf.urls.static import static
from .views import CurrentJobsListCreateAPIView, CurrentJobsDetailAPIView, PostDetailViewSet,ApplyToJobView,SignupView,AppliedJobsView,JobRegionList, EducationCategoryView
from .serializers import EmailTokenObtainPairSerializer
from .views import PersonalCreateView,AddingBalanceAPI,BillingView,JobStepsRepliesView,AskingQuestionView,UserRepliedView
from rest_framework_simplejwt.views import TokenVerifyView


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


app_name = 'apicall'
# handler404 = '.views.handler_404'
urlpatterns = [
    path('', CurrentJobsListCreateAPIView.as_view(), name='jobs-list-create'),
    # path('personal/', PersonalView.as_view(), name='personal'),
    path('personal/', PersonalCreateView.as_view(), name='personal_api'),
    path('jobregions/', JobRegionList.as_view(), name='JobRegion'),
    path('educationcategory/', EducationCategoryView.as_view(), name='educationcategory'),
    path('adding-balance/', AddingBalanceAPI.as_view(), name="adding_balance"),
    path('billing/', BillingView.as_view(), name='billing-list'),
    
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('signup/', SignupView.as_view(), name='signup'),
    path('postdetails/', PostDetailViewSet.as_view({'get': 'list'}), name='post-details'),
    path('apply-to-job/', ApplyToJobView.as_view(), name='apply_to_job'),
    path('applied_jobs/', AppliedJobsView.as_view(), name='AppliedJobsView'),
    path('jobstepsreplies/<int:job_id>/', JobStepsRepliesView.as_view(), name='jobstepsreplies_by_job'),
    path('askingquestions/<int:job_id>/', AskingQuestionView.as_view(), name='askingquestions_by_job'),
    path('userreplied/', UserRepliedView.as_view(), name='userreplies'),


    # path('<int:id>/', CurrentJobsDetailAPIView.as_view(), name='jobs-detail'),  

]