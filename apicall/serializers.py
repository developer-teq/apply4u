from rest_framework import serializers
from applyforjob.models import currentjobs, postdetail

class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = postdetail
        fields = '__all__' 
        # fields="job_title","post_name","experience","post_regions","jobs_for","max_age","min_age"
class CurrentJobsSerializer(serializers.ModelSerializer):
    sectorlogo = serializers.SerializerMethodField()
    adpic = serializers.SerializerMethodField()
    details = serializers.PrimaryKeyRelatedField(queryset=postdetail.objects.all(), many=True)
    details = PostDetailSerializer(many=True, read_only=True)  # Use the nested serializer here


    class Meta:
        model = currentjobs
        # fields = '__all__'  # You can specify fields as a list if needed
        fields = [
            'id', 'jobtitle', 'slug', 'details', 'posts', 'meta_discription', 
            'sectorinfo', 'sector', 'oraganizational_data', 'newspaper', 
            'addate', 'sectorlogo', 'adpic', 'full_add', 'lastdate', 
            'work', 'timestamp'
        ]  
    def get_sectorlogo(self, obj):
        if obj.sectorlogo:
            return self.context['request'].build_absolute_uri(obj.sectorlogo.url)
        return None

    def get_adpic(self, obj):
        if obj.adpic:
            return self.context['request'].build_absolute_uri(obj.adpic.url)
        return None

