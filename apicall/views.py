from rest_framework import generics
from applyforjob.models import currentjobs
from .serializers import CurrentJobsSerializer

# List and Create API
class CurrentJobsListCreateAPIView(generics.ListCreateAPIView):
    queryset = currentjobs.objects.all().order_by('-lastdate')
    serializer_class = CurrentJobsSerializer

    
# Retrieve, Update, Delete API
class CurrentJobsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = currentjobs.objects.all()
    serializer_class = CurrentJobsSerializer
    lookup_field = 'id'  # Change to 'slug' if you want to use the slug field for URLs
