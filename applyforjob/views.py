import json
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.contrib import messages
# from .models import *
from .models import Coupon, CouponUsage,userreply,privacy_policy,askingquestion, Post,jobnotifictions,jobregion,addingbalance, jobsectors,currentjobs,education_category, documentpics,personal,experiencepics,appliedjobs,postdetail,billing,matric,Intermediate,Bachlor,master,mphil ,doctorial
from refferals.models import Profile
from .forms import CouponForm,appliedcertificatesForm,userwebrecordForm,appliedjobsForm,personalallForm ,personalForm,addingbalanceForm, cashoutForm,mistakesForm,matricForm,IntermediateForm,BachlorForm,masterForm,mphilForm,doctorialForm,documentpicsForm,experiencepicsForm
from django .views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.core.files.storage import FileSystemStorage 
from applyforme import settings
from django.utils.html import strip_tags
from django.core.mail import send_mail
from refferals.models import Profile
# Create your views here.








def handler_404(request, *args, **argv):
    return render(request, '404.html')

# from .prevent import UserLoginRateThrottle
# class ObtainAuthToken(auth_views.ObtainAuthToken):
#     throttle_classes = (UserLoginRateThrottle,)
   

    



def googleads(request):
    return HttpResponse('google.com, pub-9974564044883991, DIRECT, f08c47fec0942fa0')

def home(request):
    if request.method=='POST':
       
        pass
    else:
        queryset = Post.objects.filter(status=1).order_by('-created_on')
        jobs=currentjobs.objects.all().order_by('-lastdate')
        page_number = request.GET.get('page')
        paginator = Paginator(jobs,4) # Show 25 contacts per page.
        job_obj=paginator.get_page(page_number)
        educateg=education_category.objects.all()
        jobsector=jobsectors.objects.all()
        jobregions=jobregion.objects.all()
        if request.user.is_authenticated:
            try:
                userprofile=Profile.objects.create(user=request.user)
                userprofile.save()
                makeaccount=billing.objects.create(user=request.user,accountmanagement=0)
                makeaccount.save()

            except:
                pass
        return render(request, 'home.html',{'jobs':job_obj,'queryset':queryset,'educateg':educateg,'jobregions':jobregions,'jobsector':jobsector})
def filtervalue(request):
    # if request.method=='GET':
    #     if request.GET.get('alljobs'):
    #         jobs=postdetail.objects.filter(job_title__work=0).order_by('-timestamp')
    #         context={'postdetail':jobs, 'alljobs':'alljobs'}
    #     elif request.GET.get('myfiltered'):
    #         userqualifications=request.user.personal.qualific
    #         jobs=postdetail.objects.filter(whocanapply__education=userqualifications).order_by('-job_title__lastdate')[:20]
    #         context={'postdetail':jobs, 'myjobs':'Jobs according to your Qualifications'}

    #     else:
    #         filterbyvalue=strip_tags( request.GET.get('educationcategory'))
    #         filterbysector=strip_tags (request.GET.get('jobsector'))
    #         filterbyregion=strip_tags (request.GET.get('jobregions'))
    #         # jobs=postdetail.objects.filter(whocanapply__education=filterbyvalue,post_regions__regions=filterbyregion,sector__sector=filterbysector).order_by('-timestamp')
    #         jobs=postdetail.objects.filter(job_title__work=0).order_by('-timestamp')
    #         context={'filterbyvalue':filterbyvalue,'filterbysector':filterbysector, 'filterbyregion':filterbyregion,'postdetail':jobs}
        return render(request, 'filtered.html')

def jobdetail(request,slug):
    detailjob = get_object_or_404(currentjobs.objects.prefetch_related('details'), slug=slug)
    return render(request, 'jobdetail.html', {'detailjob': detailjob})

    # # jobid=currentjobs.objects.get(slug=slug).id
    # # detailjob=postdetail.objects.filter(job_title_id=jobid).values_list()
    # # default 9.97 ms (39 queries including 32 similar and 18 duplicates )

    # # detailjob=postdetail.objects.select_related('job_title').filter(slug=slug)
    # # detailjob=currentjobs.objects.filter(slug=slug).prefetch_related()
    # detailjob=currentjobs.objects.filter(slug=slug)
    # # default 20.00 ms (39 queries including 32 similar and 18 duplicates )
    # # print(detailjob)
    # # print(dir(postdet.qualific_more.prefetch_related))
    # # print(postdet.qualific_more.all())
    # # print(dir(postdet))
    # # print(jod)
    # return render(request, 'jobdetail.html',{'detailjob':detailjob})

from django.contrib.auth.decorators import login_required, permission_required
@login_required
def applythis(request,slug):
    jobcost=postdetail.objects.filter(slug=slug)
    for j in jobcost:
        jobname=j.id
    form=appliedjobsForm(initial={'appliedtojob':jobname })
    return render(request,'applying.html',{'jobcost':jobcost, 'form':form})

def applyfinal(request):
    try:

        jobid=request.POST.get('jobid')
        job=postdetail.objects.get(id=jobid)
        user=request.user
        applied=appliedjobs.objects.filter(user=user,appliedtojob=job)
        # use if not for more speed
        if applied:
            return JsonResponse({'status':'Already applied on this post'})
        else:    
             totaljobcost=job.total_cost
             accountalready=billing.objects.filter(user=request.user)
             if not accountalready:
                 makeaccount=billing(user=request.user,accountmanagement=0)
                 makeaccount.save()
             useraccount=billing.objects.get(user=request.user)
             useraccount.accountmanagement-=totaljobcost  
             
             apply=appliedjobs.objects.create(user=user,appliedtojob=job)
             useraccount.save()
             apply.save()
             extradata_required='all is complete'
            #  return HttpResponse('this idon')
             return JsonResponse({'status':'applied on this post','extradata_required':extradata_required})
        
                # return JsonResponse({'status':'pleas fill necessery details'})
         
    except:
        return JsonResponse({'status':'you have not personal profile'})

def newapply(request):
    latestform=appliedjobsForm(request.GET)
    if latestform.is_valid():
        
        instance = latestform.save(commit = False)
        # job=postdetail.objects.get(id=instance.id)
        job=latestform.cleaned_data['appliedtojob']
        # job=postdetail.objects.get(appliedtojob=latestform.cleaned_data['appliedtojob'])
        applied=appliedjobs.objects.filter(user=request.user,appliedtojob=job)
                # use if not for more speed
        if applied:
            return JsonResponse({'status':'Already applied on this post'})
        else:
            # totaljobcost=job.total_cost
            # accountalready=billing.objects.filter(user=request.user)
            # if not accountalready:
            #     makeaccount=billing(user=request.user,accountmanagement=0)
            #     makeaccount.save()
            # useraccount=billing.objects.get(user=request.user)
            # useraccount.accountmanagement-=totaljobcost  
            # useraccount.save()
            instance.user=request.user
            instance.appliedtojob=job
            instance.save()
            return JsonResponse({'status':'applied on this post'})
    else:
        return HttpResponse('form was not valid')

def answeringview(request):
        if request.method=='GET':
            try:
                qid=strip_tags( request.GET.get('qid'))
                answer=strip_tags( request.GET.get('answer'))
                askingqobj=askingquestion.objects.get(id=qid)
                userreply.objects.create(job=askingqobj,userreply=answer)
                return JsonResponse({'status':'answer submitted'})
            except:
                    return JsonResponse({'status':"Sorry you can't ask here"})



def unapply(request):
    # giving id of posdetail field 
    try:
        jobid = request.GET.get('jobid')
        # user = request.GET.get('user')
        jobdetail=postdetail.objects.get(id=jobid)
        # print(jobdetail.total_cost)
        applied_jobs=appliedjobs.objects.get(user=request.user,appliedtojob_id=jobid)
        useraccount=billing.objects.get(user=request.user)
        if applied_jobs.status==0:
            useraccount.accountmanagement+=jobdetail.total_cost
            useraccount.save()
            applied_jobs.delete()
            return JsonResponse({'status':'Unapplied to this job'})
        
        else:
            return JsonResponse({'status':'Sorry registeration proccess is started'})
    except:
        return JsonResponse({'status':'Sorry some errror'})
       
       


def adding_balance(request):
    form=addingbalanceForm(request.POST)
    if request.method == 'POST':
       
        if form.is_valid():
            addinguser = form.save(commit = False) 
            nowadding=form.cleaned_data['payment_adding']
            nowtrnxid=form.cleaned_data['usertrnxid']
            checking =addingbalance.objects.filter(user=request.user, usertrnxid=nowtrnxid )
            if not checking: 
                addinguser.user=request.user
                addinguser.save() 
                messages.success(request,"Submitted ! , We'll add balance to your account with in hour, so be patient, if not so, do a complain")
                return redirect('/') 
            else:
                messages.success(request,"You are Balance already added,")
              
                return redirect('/')
            # a small check by filter by trxid is done, but i have to add any other check command also for my balance security
            # may be a page that show everyday entry, everyday submitted and more  data record balance_added, balance cost today
        else:
            messages.warning(request,"Some thing wrong with your detail, please check trx id and try again,")

    return render(request,'billingpage.html',{'form':form})


def cash_out(request):
    cashoutform=cashoutForm(request.POST)
    if request.method == 'POST':
        if cashoutform.is_valid():
            setuser = cashoutform.save(commit = False)
            setuser.user=request.user
            setuser.save()
            messages.success(request,'request submitted successfully,We contact you soon for cash')
            return redirect('/')
    return render(request, 'cashout.html',{'cashoutform':cashoutform})

def appliedjobsview(request):
    detailjob=appliedjobs.objects.filter(user=request.user)
    return render(request, 'appliedjob.html',{'detailjob':detailjob})


# class ModelA(models.Model):
#     pass
# class ModelB(models.Model):
#     a = ForeignKey(ModelA)
# ModelB.objects.select_related('a').all() # Forward ForeignKey relationship
# ModelA.objects.prefetch_related('modelb_set').all() # Reverse ForeignKey relationship



def applieddetail(request,slug):
    from itertools import chain
    from django.db.models import Max

    applied=appliedjobs.objects.get(user=request.user,slug=slug)
    qu_ans=askingquestion.objects.filter(job=applied).select_related('job').order_by('timestamp')
#   13 queries in n=8ms
    # qu_ans=askingquestion.objects.filter(job=applied).all()
    # 17 queries in 6.97ms
  

    # askingquestion
    # userreply
    # appliedcertificates

    context={'applied':applied,'result_list':qu_ans}
    return render(request, 'appliedjobdetail.html',context)






def account_history(request):
    # appliedjobs
    # billing
    # addingbalance
    from itertools import chain
    appliedjobcosts=appliedjobs.objects.filter(user=request.user)
    userbalan=billing.objects.filter(user=request.user)
    useraddedbalance=addingbalance.objects.filter(user=request.user).filter(varified=True)
    # print(appliedjobcosts.__total_cost)
    # print(appliedjobcosts.total_cost)
    # result_list = list(chain(appliedjobcosts, userbalan, useraddedbalance))
    result_list = sorted(
    chain(appliedjobcosts, userbalan, useraddedbalance),
    key=lambda instance: instance.timestamp)
    # print(result_list)
    
    detailjob=appliedjobs.objects.filter(user=request.user)
    return render(request, 'accounthistory.html',{'result_list':result_list})

def latest_updates(request):
    # get applied jobs, >>postdetail>>jobnotifictions
    # userjobs=appliedjobs.objects.filter(user=request.user)
    jobnotifications=jobnotifictions.objects.all().order_by('-timestamp')
    # print(userjobs)
   
    return render(request, 'latest_updates.html',{'jobnotifications':jobnotifications})
def jobnotifictionsview(request,slug):
    jobnotifications=jobnotifictions.objects.filter(slug=slug)
    context={'jobnotifications':jobnotifications}

    return render(request, 'jobnotifictions.html',context)


def mydata(request,slug):
    mydetail=personal.objects.filter(slug=slug)
    matricdata=matric.objects.filter(user=request.user)
    Intermediatedata=Intermediate.objects.filter(user=request.user)
    bachlordata=Bachlor.objects.filter(user=request.user)
    masterdata=master.objects.filter(user=request.user)
    mphildata=mphil.objects.filter(user=request.user)
    phd=doctorial.objects.filter(user=request.user)
    mistakform=mistakesForm(request.GET)
    if mistakform.is_valid():
        instance = mistakform.save(commit = False)
        instance.user=request.user
        instance.save()
        

    context={'mydetail':mydetail,'matricdata':matricdata,'Intermediatedata':Intermediatedata,'bachlordata':bachlordata,'masterdata':masterdata,'mphildata':mphildata,'phd':phd,'mistakform':mistakform}
    return render(request, 'mydata.html',context)

def data_varification(request):
    # valueof = request.GET.get('valueof')
    userpersonal = request.GET.get('userpersonal')
    # print(valueof)
    # print(userpersonal)
    # first you get your Job model
    userpersonal = personal.objects.get(user=request.user)
    userpersonal.datavarified= True
    userpersonal.verified_at=datetime.datetime.now()
    userpersonal.verified_time += 1
    userpersonal.save()
    return JsonResponse({"success": True})
  


def ajax_file_upload(request):
    try:
         request.user.personal
         personel=personalForm(instance=personal.objects.get(user = request.user))
        
    except:
         personel=personalForm()
    try:
         request.user.documentpics
         documentupload=documentpicsForm(instance=documentpics.objects.get(user = request.user))
    except:
        documentupload=documentpicsForm()
    expform=experiencepicsForm()
    return render(request,"ajax_file_upload.html",{'personel':personel,'documentupload':documentupload,'expform':expform})





from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def expcertupload(request):
    
    if request.method =='POST':
        try:
            # form = experiencepicsForm(request.POST ,request.FILES)
            # if form.is_valid():
            #     instance = form.save(commit = False)
            #     instance.user=request.user
            #     instance.save()
                return JsonResponse({'status':'Curentely this service is unavailable for you',})
                # return JsonResponse({'status':'your data saved', 'title': instance.title, 'duration': instance.duration, 'docscan':instance.docscan.url, 'timestamp': instance.timestamp})
        except:
            pass
    else:
        pass








@csrf_exempt
def ajax_file_upload_save(request):
    if request.method == 'POST':
        try:
            already=documentpics.objects.get(user=request.user)
            form = documentpicsForm(request.POST or None,request.FILES, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'your data updated'})
            else:
                return JsonResponse({'status':'not saved your data'})
        except:
            form = documentpicsForm(request.POST ,request.FILES)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                
                return JsonResponse({'status':'your data saved'})
            return JsonResponse({'status':'not saved your data'})
        
    return JsonResponse({'status':'not saved your data'})
     
def personeldata(request):
    if request.method == 'GET':
        try:
            personal.objects.get(user=request.user)
            already=personal.objects.get(user=request.user)
            form = personalForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                que=strip_tags(request.GET.get('qualific'))
                category=education_category.objects.get(id=que)
                educationcategory=category.year_of
                return JsonResponse({'status':'updated','educationcategory':educationcategory}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=personalForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                que=strip_tags(request.GET.get('qualific'))
                category=education_category.objects.get(id=que)
                educationcategory=category.year_of
                return JsonResponse({'status':'saved','educationcategory':educationcategory}) 
            else:
                return JsonResponse({'status':'not valid data'}) 
def loginview(request):
    return render(request, 'account/login.html',{})

from django.shortcuts import get_object_or_404

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator

def verify_email(request):
    token = request.GET.get('token')
    verification_token = get_object_or_404(Profile, bio=token)
    user = verification_token.user
    # Perform email verification
    if not user.is_active:
        user.is_active = True
        user.save()
        # Authenticate the user and login
        # user = authenticate(request, username=user.username, password=user.password)
        # login(request, user)

        # Redirect to success page
        return redirect('verification_success')

    # Token has already been used or invalid
    return redirect('verification_failed')




def signup(request, refcode=None ): 
    if request.method=='POST':
        username=request.POST.get('username')
        if User.objects.filter(username__iexact=username).exists():
            messages.success(request,'Change username,')
            return redirect('/accounts/signup/')
        email=request.POST.get('email')
        if User.objects.filter(email__iexact=email).exists():
            messages.success(request,'Email already exists,')
            return redirect('/accounts/signup/')
        email=request.POST.get('email')
        password=request.POST.get('password2')
        refferalcode=request.POST.get('refferalcode')
        
        x = User.objects.create_user(username, email, password)
        x.is_active = False
        sajidemail='sajidjoyia1996@gmail.com'
        send_mail('A user with username '+str(username), 'created an account on applyforme.pk with email '+str(sajidemail)+'  and password  '+str(password)+'', settings.EMAIL_HOST_USER, [email])
        from django.utils.crypto import get_random_string
        token = get_random_string(length=32)
        subject = 'Verify your email address'
        message = f'Click this link to verify your email address: {request.build_absolute_uri("/verify_email/")}?token={token}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)



        if refferalcode=='':
            refferalcode=None
        if refcode or refferalcode is not None:
            try:
                try:
                    recommended_by_profile = Profile.objects.get(code=refcode)
                    registered_user = User.objects.get(id=x.id)
                    userprofile=Profile.objects.create(user=registered_user,bio= token, recommended_by=recommended_by_profile.user)
                    userprofile.save()

                except:
                    recommended_by_profile = Profile.objects.get(code=refferalcode)
                    registered_user = User.objects.get(id=x.id)
                    userprofile=Profile.objects.create(user=registered_user,bio= token, recommended_by=recommended_by_profile.user)
                    userprofile.save()

            except:   
                messages.success(request,'refferal code is wrong')
                return redirect('/accounts/signup/')
        else:
            registered_user = User.objects.get(id=x.id)
            userprofile=Profile.objects.create(user=registered_user,bio= token,)
            userprofile.save()
            x.save()
            try:
                makeaccount=billing.objects.create(user=registered_user,accountmanagement=0)
                makeaccount.save()

            except:
                pass
        
        user = authenticate(username=username, password=password)
        login(request, user)
        messages.success(request,'Successfuly logedin, Please Enter educational detail to get filtered jobs ')
        return redirect('/uploadcv/')
    return render(request, 'account/signup.html',{})

def signupref(request, refcode): 
    if request.method=='POST':
        username=request.POST.get('username')
        if User.objects.filter(username__iexact=username).exists():
            messages.success(request,'Username already taken, Change username,')
            return redirect('/accounts/signup/')
        email=request.POST.get('email')
        if User.objects.filter(email__iexact=email).exists():
            messages.success(request,'Email already exists,')
            return redirect('/accounts/signup/')
        email=request.POST.get('email')
        password=request.POST.get('password2')
       
        x = User.objects.create_user(username, email, password)

        
        if refcode is not None:
            try:
                recommended_by_profile = Profile.objects.get(code=refcode)
                registered_user = User.objects.get(id=x.id)
                userprofile=Profile.objects.create(user=registered_user,recommended_by=recommended_by_profile.user)
                userprofile.save()
               
            except:   
                pass
        else:
            registered_user = User.objects.get(id=x.id)
            userprofile=Profile.objects.create(user=registered_user)
            userprofile.save()
            x.save()
            try:
                makeaccount=billing.objects.create(user=registered_user,accountmanagement=0)
                makeaccount.save()

            except:
                pass
        
        user = authenticate(username=username, password=password)
        login(request, user)
        messages.success(request,'Successfuly logedin, Please Enter educational detail to get filtered jobs ')
        return redirect('/uploadcv/')
    return render(request, 'signup.html',{})

        
def validate_username(request):
    username = request.GET.get('username', None)
    data = {
        'is_taken': User.objects.filter(username__iexact=username).exists()
    }
    return JsonResponse(data)

def ourpolicies(request):
    policies=privacy_policy.objects.all()
    return render(request, 'policies.html',{'policies':policies})

def how_to_earn(request):
    return render(request, 'how_to_earn.html',{})




def educationdata(request):
    try:
        request.user.personal
        personaldata=personalallForm(instance=personal.objects.get(user = request.user))
    except:
        personaldata=personalallForm(request.GET or None)
    try:
        request.user.matric
        matricdata=matricForm(instance=matric.objects.get(user = request.user))
    except:
        matricdata=matricForm(request.GET or None)

    try:
        request.user.intermediate
        Intermediatedata=IntermediateForm(instance=Intermediate.objects.get(user = request.user))
    except:
        Intermediatedata=IntermediateForm(request.GET or None)

    try:
        request.user.bachlor
        Bachlordata=BachlorForm(instance=Bachlor.objects.get(user = request.user))
    except:
        Bachlordata=BachlorForm(request.GET or None)

    try:
        request.user.master
        masterdata=masterForm(instance=master.objects.get(user = request.user))
    except:
         masterdata=masterForm(request.GET or None)
    

    try:
         request.user.mphil
         mphildata=mphilForm(instance=mphil.objects.get(user = request.user))
    except:
         mphildata=mphilForm(request.GET or None)
    

    try:
        request.user.doctorial
        doctorialdata=doctorialForm(instance=doctorial.objects.get(user = request.user))
    except:
         doctorialdata=doctorialForm(request.GET or None)
    try:
        request.user.experiencepics
        expform=experiencepicsForm(instance=experiencepics.objects.filter(user = request.user).first())
    except:
         expform=experiencepicsForm(request.POST, request.FILES)
    return render(request,"educationdataedit.html",{'personaldata':personaldata,'matricForm':matricdata,'IntermediateForm':Intermediatedata,'BachlorForm':Bachlordata,'masterForm':masterdata,'mphilForm':mphildata,'doctorialForm':doctorialdata,'expform':expform})
    # return render(request,"education-details.html",{'personaldata':personaldata,'matricForm':matricdata,'IntermediateForm':Intermediatedata,'BachlorForm':Bachlordata,'masterForm':masterdata,'mphilForm':mphildata,'doctorialForm':doctorialdata,'expform':expform})
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie  # Ensures the CSRF token is set in cookies for AJAX requests
def personaldata(request):
    if request.method == 'POST':  # Use POST for data submission
        try:
            # Check if user already has data
            personal_instance = personal.objects.filter(user=request.user).first()
            form = personalallForm(request.POST or None, instance=personal_instance)

            if form.is_valid():
                instance = form.save(commit=False)
                if not personal_instance:
                    instance.user = request.user  # Assign user for new entries
                instance.save()

                # Handle additional logic for `qualific` field
                que = request.POST.get('qualific')
                print('Qualific ID:', que)
                try:
                    category = education_category.objects.get(id=que)
                    educationcategory = category.year_of
                except education_category.DoesNotExist:
                    return JsonResponse({'status': 'Invalid qualific ID', 'errors': {'qualific': 'Invalid education category'}})

                return JsonResponse({'status': 'personal data updated', 'educationcategory': educationcategory})

            # Return form validation errors
            print('Form is not valid. Errors:', form.errors)
            return JsonResponse({'status': 'not valid data', 'form_errors': form.errors})

        except Exception as e:
            print('Exception occurred:', str(e))
            return JsonResponse({'status': 'error', 'message': 'An error occurred', 'details': str(e)})

    return JsonResponse({'status': 'invalid request', 'message': 'Only POST requests are allowed'})


def matricdata(request):
    if request.method == 'GET':
        try:
            matric.objects.get(user=request.user)
            already=matric.objects.get(user=request.user)
            form = matricForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'personal data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=matricForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
            return JsonResponse({'status':'saved'}) 


def interdata(request):
    if request.method == 'GET':
        try:
            Intermediate.objects.get(user=request.user)
            already=Intermediate.objects.get(user=request.user)
            form = IntermediateForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'Intermediate data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=IntermediateForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                return JsonResponse({'status':'intermediate data saved'}) 
def bachelordata(request):
    if request.method == 'GET':
        try:
            Bachlor.objects.get(user=request.user)
            already=Bachlor.objects.get(user=request.user)
            form = BachlorForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'bachelor data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=BachlorForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                return JsonResponse({'status':'bachelor data saved'}) 
def masterdata(request):
    if request.method == 'GET':
        try:
            master.objects.get(user=request.user)
            already=master.objects.get(user=request.user)
            form = masterForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'master data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=masterForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                return JsonResponse({'status':'master data saved'}) 
def mphildata(request):
    if request.method == 'GET':
        try:
            mphil.objects.get(user=request.user)
            already=mphil.objects.get(user=request.user)
            form = mphilForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'mphil data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=mphilForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                return JsonResponse({'status':'mphil data saved'}) 
def doctordata(request):
    if request.method == 'GET':
        try:
            doctorial.objects.get(user=request.user)
            already=doctorial.objects.get(user=request.user)
            form = doctorialForm(request.GET or None, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'doctorial data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=doctorialForm(request.GET)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                return JsonResponse({'status':'doctorial data saved'}) 


from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def experiencedata(request):
    if request.method == 'POST':
        try:
            experiencepics.objects.get(user=request.user)
            already=experiencepics.objects.get(user=request.user)
            form = experiencepicsForm(request.POST ,request.FILES, instance = already)
            if form.is_valid():
                form.save()
                return JsonResponse({'status':'experience data updated'}) 
            return JsonResponse({'status':'not valid data'}) 
        except:
            form=experiencepicsForm(request.POST, request.FILES)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user=request.user
                instance.save()
                return JsonResponse({'status':'experience data saved'}) 
def expe_del(request):
    exp_id=strip_tags(request.GET.get('exp_id'))
    experience=experiencepics.objects.get(id=exp_id)
    experience.delete()
    return JsonResponse({'status':'Data Deleted'}) 


@login_required
def apply_coupon(request):
    if request.method == 'POST':
        form = CouponForm(request.POST)
        if form.is_valid():
            code = form.cleaned_data['code']
            user = request.user
            coupon = Coupon.objects.filter(code=code, active=True).first()
            if coupon:
                usage = CouponUsage.objects.filter(coupon=coupon, user=user).first()
                if usage:
                    messages.warning(request, 'This coupon has already been applied.')
                else:
                    # apply the discount and update the user's account balance
                    CouponUsage.objects.create(coupon=coupon, user=user)
                    useraccount=billing.objects.get(user=user)
                    # user_balance = AccountBalance.objects.get(user=request.user)
                    useraccount.userbalance += coupon.discount
                    useraccount.accountmanagement += coupon.discount
                    useraccount.save()
                    messages.success(request, f"Coupon applied successfully. Congratulations! Your coupon code has been accepted and {coupon.discount} has been added to your account balance.")

            else:
                messages.warning(request, 'Invalid coupon code.')
    else:
        form = CouponForm()
    return render(request, 'apply_coupon.html', {'form': form})













