from rest_framework import serializers
from applyforjob.models import currentjobs

class CurrentJobsSerializer(serializers.ModelSerializer):
    sectorlogo = serializers.SerializerMethodField()
    adpic = serializers.SerializerMethodField()
    class Meta:
        model = currentjobs
        fields = '__all__'  # You can specify fields as a list if needed
    def get_sectorlogo(self, obj):
        if obj.sectorlogo:
            return self.context['request'].build_absolute_uri(obj.sectorlogo.url)
        return None

    def get_adpic(self, obj):
        if obj.adpic:
            return self.context['request'].build_absolute_uri(obj.adpic.url)
        return None


        