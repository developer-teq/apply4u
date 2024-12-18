from rest_framework import generics
from rest_framework.decorators import api_view
from applyforjob.models import currentjobs,postdetail,appliedjobs,jobregion,education_category,personal,billing,addingbalance,jobstepsreplies,askingquestion,userreplied
from .serializers import CurrentJobsSerializer,PostDetailSerializer,AppliedJobsSerializer,PersonalSerializer,JobRegionSerializer,EducationCategorySerializer,AddingBalanceSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# List and Create API

# class JobRegionView(APIView):
#     def get(self, request):
#         regions = jobregion.objects.values("id", "regions")
#         return Response(regions)
class JobRegionList(generics.ListAPIView): 
    # permission_classes = [IsAuthenticated]

    
    queryset = jobregion.objects.all() 
    serializer_class = JobRegionSerializer

class EducationCategoryView(generics.ListAPIView): 
    queryset = education_category.objects.all() 
    serializer_class = EducationCategorySerializer

# class EducationCategoryView(APIView):
#     def get(self, request):
#         categories = education_category.objects.values("id", "education")
#         return Response(categories)

# class PersonalView(APIView):
#     def post(self, request):
#         modeldata=jobregion.objects.all()
#         print(modeldata)
#         serializer = PersonalSerializer(data=request.data)
#         # print(request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         print(serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST'])
# def PersonalView(request):
#      if request.method == 'POST': 
#         serializer = PersonalSerializer(data=request.data, context={'request': request}) 
#         if serializer.is_valid(): 
#             serializer.save() 
#             return Response(serializer.data, status=status.HTTP_201_CREATED) 
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated


from rest_framework.generics import RetrieveUpdateAPIView
class PersonalCreateView(RetrieveUpdateAPIView):
    queryset = personal.objects.all()
    serializer_class = PersonalSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve the user's profile or create a blank one
        user=User.objects.get(id=self.request.user.id)
        obj, created = personal.objects.get_or_create(user=user)
        return obj


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
        print(appliedjobs.objects.filter(user_id=self.request.user.id))
        return appliedjobs.objects.filter(user_id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        print(serializer.data)  # Logs the serialized response
        return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
import secrets
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

class AddingBalanceAPI(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    def get(self, request):
        adding_balance_data = addingbalance.objects.filter(user_id=self.request.user.id)  # Assuming the user is logged in
        serializer = AddingBalanceSerializer(adding_balance_data, many=True)
        return Response(serializer.data)


    def post(self, request):
        print(request.data)
        serializer = AddingBalanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)  # Associate the logged-in user
            return Response({"message": "Balance added successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



from .serializers import BillingSerializer

class BillingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        billing_data = billing.objects.filter(user_id=request.user.id)  # Assuming user is logged in
        serializer = BillingSerializer(billing_data, many=True)
        return Response(serializer.data)

from .serializers import JobStepsRepliesSerializer
class JobStepsRepliesView(APIView):
    # Get all replies or filter by job ID
    permission_classes = [IsAuthenticated]
    def get(self, request, job_id=None):
        if job_id:
            replies = jobstepsreplies.objects.filter(job_id=job_id)
        else:
            replies = jobstepsreplies.objects.all()
        serializer = JobStepsRepliesSerializer(replies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Create a new reply
    def post(self, request):
        serializer = JobStepsRepliesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from .serializers import AskingQuestionSerializer,UserRepliedSerializer

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import AskingQuestionSerializer, UserRepliedSerializer

class AskingQuestionView(APIView):
    permission_classes = [IsAuthenticated]

    # Get all questions or filter by job ID
    def get(self, request, job_id=None):
        if job_id:
            questions = askingquestion.objects.filter(job_id=job_id)
            user_replies = userreplied.objects.filter(job_id=job_id)
        else:
            questions = askingquestion.objects.all()
            user_replies = userreplied.objects.all()

        # Serialize the data
        q_serializer = AskingQuestionSerializer(questions, many=True)
        r_serializer = UserRepliedSerializer(user_replies, many=True)
        

        # Return the data in a structured format (separate questions and replies)
        return Response({
            'questions': q_serializer.data,
            'user_replies': r_serializer.data
        }, status=status.HTTP_200_OK)

    # Add a new question
    def post(self, request):
        serializer = AskingQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserRepliedView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = UserRepliedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)