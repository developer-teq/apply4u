from django.http.response import HttpResponse
from django.shortcuts import render
import json
import datetime
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http.response import HttpResponse

from django.contrib import messages
from django.shortcuts import redirect, render
from applyforjob.models import personal, matric,userreply,requestonline,jobstepsreplies,askingquestion, cashout,mistakes,jobregion,addingbalance, jobsectors,currentjobs,education_category, documentpics,personal,appliedjobs,postdetail,billing,matric,Intermediate,Bachlor,master,mphil ,doctorial

from applyforjob.forms import requestonlineForm,feedbacksForm, complaintsForm,appliedcertificatesForm,userwebrecordForm,personalForm,addingbalanceForm, mistakesForm,matricForm,IntermediateForm,BachlorForm,masterForm,mphilForm,doctorialForm,documentpicsForm
from django.contrib.auth.decorators import login_required

from django.core.mail import send_mail
from django.conf import settings

# Create your views here.
# def staff(request):
   
#     return render(request, 'registerme/staff.html',{})
def staff(request):
    if request.user.is_superuser:
        if request.method=='POST':
            
            # print(request.GET.get('username'))
            username=request.POST.get('username')

            # person=personal.objects.get(user=username)
            person=User.objects.filter(username__iexact=username)
            # print(person.first())
            # print(request.user)
            # for i in person:
            #     for experiencepics in i.experiencepics_set.all():
            #         print(experiencepics.title)
            form = userwebrecordForm(request.POST, request.FILES)
            userrecordform = appliedcertificatesForm(request.POST, request.FILES)
            # print(dir(person.values_list))

            
            # for user account history
            from itertools import chain
            appliedjobcosts=appliedjobs.objects.filter(user=person.first())
            userbalan=billing.objects.filter(user=person.first())
            useraddedbalance=addingbalance.objects.filter(user=person.first()).filter(varified=True)
            # print(appliedjobcosts.__total_cost)
            # print(appliedjobcosts.total_cost)
            # result_list = list(chain(appliedjobcosts, userbalan, useraddedbalance))
            result_list = sorted(
            chain(appliedjobcosts, userbalan, useraddedbalance),
            key=lambda instance: instance.timestamp)
            # print(result_list)

            context={'person':person,'form':form,'userrecordform':userrecordform,'result_list':result_list}
            return render(request, 'registerme/staff.html',context)
        else:
            return render(request, 'registerme/staff.html',{})


    else:
        return HttpResponse('this is not that you want')


def auddit(request):
    if request.user.is_superuser:
        # get all expense and income 
        # profit and lost
        # total users added today
        # personal= to count how many users are added their profile
        # appliedjobs = to tell how many jobs are applied , how much cost of all those , how much ref commistion
        # billing=  total all users balance varified
        # addingbalance = how many peoples balance added today can how much varified, and who is doing fraud
        # how many persons applied for cash outs
        # mistakes = how many mistake are corrected by user
        users=billing.objects.all()
        totolbalance=0
        totalearning=0
        for i in users:
            if i.accountmanagement>=0:
               
                totolbalance+=i.accountmanagement
        totalearning=totalearning
        alluserbalancesum=totolbalance



        stockmarket=billing.objects.all().order_by('-timestamp')
        totaluser=personal.objects.all()
        appliedj=appliedjobs.objects.all()
        balanadded=addingbalance.objects.all()
        balancereq=cashout.objects.all()
        reqeustingonline=requestonline.objects.all()
        mistake=mistakes.objects.all()
        
        return render(request, 'registerme/auddit.html',{'totalearning':totalearning,'alluserbalancesum':alluserbalancesum,'totaluser':totaluser,'appliedj':appliedj,'stockmarket':stockmarket,'balanadded':balanadded ,'balancereq':balancereq,'mistake':mistake,'reqeustingonline':reqeustingonline })

        pass
    else:
        return HttpResponse('You are not authorized for this page')
 
from django.utils import timezone
def today_entry(request):
    if request.user.is_superuser:
        ten_user=User.objects.all().order_by('-date_joined')[:30]
        ten_personel=personal.objects.all().order_by('-create_date')[:30]
        ten_matric=matric.objects.all()[:15]
        context={'ten_user':ten_user,'ten_personel':ten_personel,'ten_matric':ten_matric}
        return render(request, 'registerme/today_entry.html',context)
    else:
        return HttpResponse('You are not authorized for this page')

def userwebview(request):
    if request.user.is_superuser:
        if request.method == 'POST':
        
            thisuser=request.POST.get('thisuser')
            useracc=User.objects.get(username=thisuser)
            form = userwebrecordForm(request.POST, request.FILES)
            if form.is_valid():
                instance=form.save(commit=False)
                instance.user=useracc
                instance.save()
                return JsonResponse({'error': False, 'message': 'Uploaded Successfully'})
            else:
                return JsonResponse({'error': True, 'errors': form.errors})
    else:
        return HttpResponse('You are not authorized for this page')

    
 
def slipsuploadview(request):
    if request.user.is_superuser:
        if request.method == 'POST':
            
            job_id=request.POST.get('jobid')
            job=appliedjobs.objects.get(slug=job_id)
            userrecordform = appliedcertificatesForm(request.POST, request.FILES)
            if userrecordform.is_valid():
                addjob=userrecordform.save(commit=False)
                addjob.appliedjob=job
                addjob.save()
            

                return JsonResponse({'error': False, 'message': 'Uploaded Successfully'})
            else:
                return JsonResponse({'error': True, 'errors': userrecordform.errors})
    else:
        return HttpResponse('You are not authorized for this page')
    

        
def registerationstarted(request):
    if request.user.is_superuser:
        if request.method=='GET':
            user=request.GET.get('userid')
            jobslug=request.GET.get('value')
            applied_jobs=appliedjobs.objects.get(user=user,slug=jobslug) 
           
            applied_jobs.status=1
            applied_jobs.save()
            return JsonResponse({'status':'registeration proccess started'})
        return JsonResponse({'status':'this is not mathod'})
    return JsonResponse({'status':'You are not authorized'})

def askingview(request):
    if request.user.is_superuser:
        if request.method=='GET':
            user=request.GET.get('userid')
            jobslug=request.GET.get('jobslug')
            askq=request.GET.get('askq')
            applied_jobs=appliedjobs.objects.get(user=user,slug=jobslug)
            questionasking=askingquestion(job=applied_jobs,whattoask=askq)
            questionasking.save()
            email=str(applied_jobs.user.email)
            send_mail('A team member asked '+str(questionasking), 'As you requested to apply on the job of '+str(applied_jobs.appliedtojob.post_name)+' in '+str(applied_jobs.appliedtojob.job_title)+'\n Please visit https://applyforme.pk/appliedjobs/ and see notification details \n\n Thank you for trusting us. \n applyforme.pk team', settings.EMAIL_HOST_USER, ['sajidjoyia1996@gmail.com',])
            return JsonResponse({'status':'question submitted'})
        return JsonResponse({'status':'this is not mathod'})
    return JsonResponse({'status':'You are not authorized'})
# check answering is using for admin or not

def answeringview(request):
    if request.user.is_superuser:
        if request.method=='GET':
           
            try:
                job_id=request.GET.get('job_id')
                answer=request.GET.get('answer')
                askingqobj=askingquestion.objects.get(id=job_id)
                userreply.objects.create(job=askingqobj,userreply=answer)
                
                return JsonResponse({'status':'answer submitted'})
            except:
                    return JsonResponse({'status':'This question does not exists'})
    else:
        return HttpResponse('You are not authorized for this page')


def steptakenview(request):
    if request.user.is_superuser:
        try:
            if request.method=='GET':
              
                jobslug=request.GET.get('jobslug')
                steptaken=request.GET.get('steptaken')
                applied_jobs=appliedjobs.objects.get(slug=jobslug)
               
                jobstepsreplies.objects.create(job=applied_jobs,steps=steptaken)
                return JsonResponse({'status':'step saved'})
        except:
            pass

def accountant(request):
    if request.user.is_authenticated:
        balance_added=addingbalance.objects.all()
        context={'balance_added':balance_added}
        return render(request, 'registerme/accountant.html',context)

    else:
        return HttpResponse('no i am not staff member')

def accounting(request):
    if request.method=='POST':
        balanceid=request.POST.get('balanceid')
        balancevarified=request.POST.get('balancevarified')
        payment_adding=request.POST.get('payment_adding')
        wecantrust=request.POST.get('wecantrust')
        comment=request.POST.get('comment')
      
        userrecharge=addingbalance.objects.get(id=balanceid)
        
        if not userrecharge.varified:
            userrecharge.varified=True
            userrecharge.comment=comment
            if wecantrust: 
                    userrecharge.fraudingperson=True
            try:
                 userrecharge.user.billing
            except:
                 makeaccount=billing(user=userrecharge.user,accountmanagement=0)
                 makeaccount.save()
                
            userrecharge.user.billing.accountmanagement += int(payment_adding)
            userrecharge.user.billing.save()
            userrecharge.save()
            usernewbalance=userrecharge.user.billing.accountmanagement
            return JsonResponse({'status':'saved','usernewbalance':usernewbalance})
        else:
            return JsonResponse({'status':'Already added this'})

@login_required
def complaints(request):
    form=complaintsForm(request.POST or None)
    if form.is_valid():
        instance = form.save(commit = False)
        instance.user=request.user
        instance.save()
        # complain_id=instance.id
        return JsonResponse({'status':'form is saved'})

    else:
        feedbackform=feedbacksForm()
        return render(request, 'registerme/complains.html',{'form':form,'feedbackform':feedbackform,'status':'form was not valid'})
    

@login_required
def feedback(request):
    feedbackform=feedbacksForm(request.POST or None)
    if feedbackform.is_valid():
        instance = feedbackform.save(commit = False)
        instance.user=request.user
        instance.save()
        return JsonResponse({'status':'form is saved'})

@login_required
def requesting(request):
    requestonlineform=requestonlineForm(request.POST, request.FILES) 
    if requestonlineform.is_valid():
        instance = requestonlineform.save(commit = False)
        instance.user=request.user
        instance.save()
        messages.success(request,"Your request is submitted, Our available representative'll contact you soon!")
        return redirect('/') 
        # return JsonResponse({'status':'Your request is submitted! our available person contact you soon'})
    return render(request, 'registerme/requestingonline.html',{'requestonlineform':requestonlineform})

def experimental_page(request):
    if request.user.is_superuser:
        postdetailjobs=currentjobs.objects.filter(work=0).order_by('-timestamp')
        jobs=askingquestion.objects.filter(read=False).order_by('-timestamp')[:10]
        userreplies=userreply.objects.all().order_by('-timestamp')[:10]
        
        unseenquestions=[]
        for k in jobs:
            unseenquestions.append(k)
        if request.method =='GET':
            jobidjob=request.GET.get('jobid')
            if jobidjob:
                jobdetail=postdetail.objects.get(id=jobidjob)
                marit=list(jobdetail.whocanapply.all())
                marit_qouta=list(jobdetail.post_regions.all())
                person=personal.objects.all()
                personlist=[]
                for k in person:
                    userage= calculate_age(k.Dateofbirth)
                    if k.qualific in marit:
                        if k.domicile in marit_qouta:
                            if jobdetail.jobs_for == k.gender or jobdetail.jobs_for =='both':
                                if jobdetail.max_age>= userage:
                                    personlist.append(k.user)
                            else:
                                pass
                return render(request, 'registerme/experiment.html',{'educateg':postdetailjobs,'personlist':personlist,'item':jobdetail})
        return render(request, 'registerme/experiment.html',{'educateg':postdetailjobs,'unseenquestions':unseenquestions,'userreplies':userreplies})
    else:
        return HttpResponse('You are not authorized for this page')

def forwhatsapp(request):
    if request.user.is_superuser:
        tenyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=10).order_by('-timestamp')
        
        towlveyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=12).order_by('-timestamp')
        therteenyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=13).order_by('-timestamp')
        fourteenyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=14).order_by('-timestamp')
        sixteenyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=16).order_by('-timestamp')
        eighteenyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=18).order_by('-timestamp')
        twntyoneyear=postdetail.objects.filter(job_title__work=0,qualification_req__year_of=21).order_by('-timestamp')
                   
        context={'tenyear':tenyear,'towlveyear':towlveyear,'therteenyear':therteenyear,'fourteenyear':fourteenyear,'sixteenyear':sixteenyear,'eighteenyear':eighteenyear,'twntyoneyear':twntyoneyear}
        return render(request, 'registerme/forwhatsapp.html',context)
    else:
        return HttpResponse('You are not authorized for this page')


# complaintsForm
# feedbacksForm
# complaints_repForm


        # if userrecharge.user.billing:
        #     if balancevarified:
        #         userrecharge.varified=True
        #         if wecantrust:
        #             userrecharge.fraudingperson=True
        #         userrecharge.comment=comment
        #         userrecharge.save()
        #         userrecharge.user.billing.accountmanagement += int(payment_adding)
        #         userrecharge.user.billing.save()
        #         usernewbalance=userrecharge.user.billing.accountmanagement
        #         return JsonResponse({'status':'saved','usernewbalance':usernewbalance})
            
        #     return JsonResponse({'status':'You have not tick to varified'})
        # else:
        #     if balancevarified:
        #         userrecharge.varified=True
        #         if wecantrust:
        #             userrecharge.fraudingperson=True
        #         userrecharge.comment=comment
        #         userrecharge.save()
        #         makeaccount=billing(user=userrecharge.user,accountmanagement=payment_adding)
        #         makeaccount.save()
        #         usernewbalance=userrecharge.user.billing.accountmanagement
        #         return JsonResponse({'status':'Created a new account and added balance','usernewbalance':usernewbalance})

from datetime import datetime
from datetime import date

def calculate_age(dob):
    if not dob:
        return 45

    if isinstance(dob, date):
        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        
        return age
    else:
        return 45