from rest_framework import generics
from applyforjob.models import currentjobs,postdetail
from .serializers import CurrentJobsSerializer,PostDetailSerializer
from rest_framework import viewsets
# List and Create API
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