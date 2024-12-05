from rest_framework import generics

from applyforjob.models import currentjobs,postdetail,appliedjobs,jobregion,education_category
from .serializers import CurrentJobsSerializer,PostDetailSerializer,AppliedJobsSerializer,PersonalSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# List and Create API

class JobRegionView(APIView):
    def get(self, request):
        regions = jobregion.objects.values("id", "regions")
        return Response(regions)

class EducationCategoryView(APIView):
    def get(self, request):
        categories = education_category.objects.values("id", "education")
        return Response(categories)

class PersonalView(APIView):
    def post(self, request):
        modeldata=jobregion.objects.all()
        print(modeldata)
        serializer = PersonalSerializer(data=request.data)
        # print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentJobsListCreateAPIView(generics.ListCreateAPIView):
    queryset = currentjobs.objects.all().order_by('-lastdate')
    serializer_class = CurrentJobsSerializer
    
# Retrieve, Update, Delete API
class CurrentJobsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = currentjobs.objects.all()
    serializer_class = CurrentJobsSerializer
    lookup_field = 'id'  # Change to 'slug' if you want to use the slug field for URLs


class PostDetailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = postdetail.objects.all()
    serializer_class = PostDetailSerializer

class ApplyToJobView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get("user_id")
        job_id = data.get("job_id")

        # Validate if the user exists
        try:
            user = User.objects.get(id=user_id)  # Assuming you're using the default User model
        except User.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate if the job exists
        try:
            job = postdetail.objects.get(id=job_id)
        except postdetail.DoesNotExist:
            return Response({"message": "Job not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user has already applied to the job
        if appliedjobs.objects.filter(user=user, appliedtojob=job).exists():
            return Response({"message": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)

        # If not already applied, save the application
        applied_job = appliedjobs(user=user, appliedtojob=job)
        applied_job.save()

        return Response({"message": "Application saved successfully!"}, status=status.HTTP_201_CREATED)

class AppliedJobsView(ListAPIView):
    serializer_class = AppliedJobsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter applied jobs for the currently authenticated user
        return appliedjobs.objects.filter(user=self.request.user)

from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'detail': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'detail': 'User created successfully.'}, status=status.HTTP_201_CREATED)