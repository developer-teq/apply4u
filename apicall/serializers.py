
from rest_framework import serializers, viewsets

from applyforjob.models import currentjobs,appliedcertificates, postdetail,education_category,jobregion,appliedjobs,personal,addingbalance,billing, askingquestion, jobstepsreplies,userreplied
from django.contrib.auth import authenticate 
class EducationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = education_category
        fields = ['id', 'education', 'year_of'] 
class JobRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = jobregion
        fields = ['id', 'regions'] 

class PostDetailSerializer(serializers.ModelSerializer):
    qualification_req = EducationCategorySerializer(many=True, read_only=True)  
    whocanapply = EducationCategorySerializer(many=True, read_only=True)  
    post_regions = JobRegionSerializer(many=True, read_only=True)
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

class AppliedJobsSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='__str__', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = appliedjobs
        fields = ['id', 'appliedtojob', 'timestamp', 'alldone', 'comment', 'status_display', 'ref_payment','job_title']



class AppliedCertificatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = appliedcertificates
        fields = '__all__'






from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims if needed
        token['email'] = user.email
        return token

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('username'),  # Expecting email in username field
            'password': attrs.get('password'),
        }
        user = authenticate(**credentials)

        if user:
            if not user.is_active:
                raise serializers.ValidationError('Account is disabled.')
            return super().validate(attrs)
        else:
            raise serializers.ValidationError('Invalid email or password.')

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = personal
        
        fields = [
             'full_name','user',
            'domicile', 'qualific', 'gender','Dateofbirth',  
            'phone_number', 'get_alerts_by', 'send_education_based_jobs_alerts', 
             'My_Father_is', 
        ]
        extra_kwargs = {
            'user': {'read_only': True},  # User is automatically set based on the logged-in user.
            'slug': {'read_only': True},  # Slug should auto-generate or be handled separately.
            'create_date': {'read_only': True},  # Auto-generated fields should not be editable.
        }


class AddingBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = addingbalance
        fields = "__all__"  # Include all fields or specify required ones
        read_only_fields = ["timestamp", "varified", "fraudingperson"]  

class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = billing
        # fields = ['id', 'user', 'userbalance', 'accountmanagement', 'userloan', 'userlastpayment', 'timestamp', 'trusted', 'loancleared', 'earnings']
        fields = ['userbalance', 'accountmanagement', 'timestamp',]

class JobStepsRepliesSerializer(serializers.ModelSerializer):
    class Meta:
        model = jobstepsreplies
        fields = '__all__'

class AskingQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = askingquestion
        fields = '__all__'



class UserRepliedSerializer(serializers.ModelSerializer):
    class Meta:
        model = userreplied
        fields = ['id', 'job', 'extradocument', 'userreply', 'read', 'timestamp']
        read_only_fields = ['id', 'timestamp', 'read']

