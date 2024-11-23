from django import forms
from django.forms import Textarea
from captcha.fields import CaptchaField

from .models import requestonline,appliedjobs, complaints_rep, complaints, feedbacks,cashout,appliedcertificates, userwebrecord, addingbalance,postdetail, education_category,personal,matric,Intermediate,Bachlor,master,mphil,doctorial,documentpics,experiencepics,mistakes


class DateInput(forms.DateInput):
    input_type = 'date'
class personalForm(forms.ModelForm):
    captcha = CaptchaField()
    class Meta:
        model = personal
        
        fields = '__all__'
        # fields = ['full_name','qualific','Dateofbirth','gender','phone_number','get_alerts_by','domicile','address','captcha']
        widgets = {
            'gender': forms.RadioSelect,
            'Dateofbirth':DateInput(),

            
        }
        attrs = {'class': 'form-check-inline'}
       
class personalallForm(forms.ModelForm):
    captcha = CaptchaField()
    class Meta: 
        model = personal
        # fields = '__all__'

        fields = ['full_name','father_name','gender','Dateofbirth','qualific','phone_number','get_alerts_by','cnic_number','father_cnic','My_Father_is','address','domicile','captcha']
        widgets = {
            'gender': forms.RadioSelect,
            'My_Father_is':forms.RadioSelect,
            'Dateofbirth':DateInput(),
        }
        attrs = {'class': 'form-check-inline'}
        labels = {
            "full_name": "Full name",
            "qualific": "Highest Qualification",
            "phone_number": "Phone number ",
            "address": "Address"
        }



class matricForm(forms.ModelForm):
    class Meta:
        model = matric
        # fields = '__all__'
        fields = ['title', 'marks', 'total_marks','board','result_date']
        widgets = {
            
            'result_date':DateInput(),
        }



class IntermediateForm(forms.ModelForm):
    class Meta:
        model = Intermediate
        # fields = '__all__'
        fields = ['title', 'marks', 'total_marks','board','result_date']
        widgets = {
            
            'result_date':DateInput(),
        }
       
class BachlorForm(forms.ModelForm):
    class Meta:
        model = Bachlor
        # fields = '__all__'
        fields = ['title', 'marks', 'total_marks','board','result_date']
        widgets = {
            
            'result_date':DateInput(),
        }
class masterForm(forms.ModelForm):
    class Meta:
        model = master
        # fields = '__all__'
        fields = ['title', 'marks', 'total_marks','board','result_date']

       

class mphilForm(forms.ModelForm):
    class Meta:
        model = mphil
        # fields = '__all__'
        fields = ['title', 'cgpa', 'total_cgpa','university','result_date']
        widgets = {
            
            'result_date':DateInput(),
        }
       

class doctorialForm(forms.ModelForm):
    class Meta:
        model = doctorial
        # fields = '__all__'
        fields = ['title', 'cgpa', 'total_cgpa','university','result_date']
        widgets = {
            
            'result_date':DateInput(),
        }

class documentpicsForm(forms.ModelForm):
    class Meta:
        model = documentpics
        # fields = '__all__'
        fields = ['picture', 'upload_cv','matric', 'inter','bachlor','master','mphil','doctor','cnic_front','cnic_back','Father_cnic']
class experiencepicsForm(forms.ModelForm):
    class Meta:
        model = experiencepics
        # fields = '__all__'
        fields = ['title','duration','docscan']
        widgets = {

            'title': Textarea(attrs = {'cols': 30, 'rows': 1,'id': 'exp_pictitle', 'required pattern':'[a-zA-Z]*'}),
          
        }




choices = [('JazzCash','JazzCash'),
         ('Easypaisa','Easypaisa')]
class addingbalanceForm(forms.ModelForm):
    class Meta:
        model = addingbalance
        # fields = '__all__'
        fields = ['payment_adding','usertrnxid',]
        labels = {
            "payment_adding": "Amount adding",
            "usertrnxid": "Transection Id"
        }
    
       
    def __init__(self, *args, **kwargs):
        super(addingbalanceForm, self).__init__(*args, **kwargs)
        for field in self.fields.values():
            if isinstance(field.widget, forms.Select):
                field.widget = forms.RadioSelect()

class mistakesForm(forms.ModelForm):
    class Meta:
        model = mistakes
        # fields = '__all__'
        fields = ['mistake','mistake_sol']
        widgets = {

            'mistake': Textarea(attrs = {'cols': 30, 'rows': 1,"placeholder": "where is mistake"}),
            'mistake_sol': Textarea(attrs = {'cols': 30, 'rows': 6,"placeholder": "its correction"}),
          
        }

class userwebrecordForm(forms.ModelForm):
        
    class Meta:
        model = userwebrecord
        # fields = '__all__'
        fields=[
            'web_name','web_pass','doc','intertained',]
        
class appliedcertificatesForm(forms.ModelForm):
        
    class Meta:
        model = appliedcertificates
        # fields = '__all__'
        fields =[
        'purpose','description','depositslip'
        ]
        
class cashoutForm(forms.ModelForm):  
    class Meta:
        model = cashout
        # fields = '__all__'
        fields =[
        'cashout','payemntmathod','comment'
        ]

  
class complaintsForm(forms.ModelForm):  
    captcha = CaptchaField()
    class Meta:
        model = complaints
        # fields = '__all__'
        fields =['title',
        'problem','captcha'
        ]
        widgets = {

            'problem': Textarea(attrs = {'cols': 30, 'rows': 3,"placeholder": "Type you complain here"}),
          
        }
        
class feedbacksForm(forms.ModelForm):  
    class Meta:
        model = feedbacks
        # fields = '__all__'
        fields =['title',
        'discription'
        ]
        widgets = {

            'discription': Textarea(attrs = {'cols': 30, 'rows': 3,"placeholder": "We always welcome our users feedbacks "}),
          
        }
        
class appliedjobsForm(forms.ModelForm):  
    class Meta:
        model = appliedjobs
        # fields = '__all__'
        fields = ['appliedtojob']
class complaints_repForm(forms.ModelForm):  
    class Meta:
        model = complaints_rep
        fields = '__all__'
        
        # fields =[
        # 'problem'
        # ]
class requestonlineForm(forms.ModelForm):  
    class Meta:
        model = requestonline
       
        fields =[
        'I_want_to','screenshot_of_ad'
                ]


class CouponForm(forms.Form):
    code = forms.CharField(max_length=50, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Enter coupon code here'
    }))
