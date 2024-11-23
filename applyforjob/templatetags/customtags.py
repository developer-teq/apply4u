from django import template
register = template.Library()
from applyforjob.models import postdetail, appliedjobs

@register.filter(name = 'pending')
def pending(user,id):
    try:
        applied_jobs=appliedjobs.objects.get(user=user,appliedtojob_id=id) 
        # applied_jobs=appliedjobs.objects.get(user=user,appliedtojob=id) 
        # print(dir(applied_jobs.values_list))
        # print(applied_jobs.pending)
        
        if applied_jobs.status==0:
            return 'We contact you soon'
        if applied_jobs.status==1:
            return 'Our member is doing registeration, so you can not unapply,'
        if applied_jobs.status==2:
            return 'registeration is done, go to uplied jobs and see credentials , '
        if applied_jobs.status==3:
            return 'some problem accured, please contact us as soon as possible , '
        
        
    except:
        pass


@register.filter(name = 'eligible')
def eligible(user,id):
    try:
         job=postdetail.objects.get(id=id)
         userq=user.personal.qualific
         if user.personal.qualific in list(job.whocanapply.all()):
             return 'You are eligible for above Post'
         else:
             return 'You are not eligible' 
    except:
        return 'Upload your data to check your eligiblility'
@register.filter(name = 'eligiblecount')
def eligiblecount(user):
    try:
        userqualifications=user.personal.qualific
        userregions=user.personal.domicile
        jobs=len(postdetail.objects.filter(qualification_req__education=userqualifications,post_regions__regions=userregions).order_by('-timestamp'))
        return jobs
    except:
        return ''

@register.filter(name = 'qouta')
def qouta(user,id):
    try:
        job=postdetail.objects.get(id=id)
        if user.personal.domicile is not None:
            if user.personal.domicile in list(job.post_regions.all()):
                return 'Your domicile Quota is available'
            else:
                return 'Your domicile Quota is not available'
        else:
            return 'Please add domicile data in personal to check domicile quota'
    except:
        return 'Please update your personal and domicile '


@register.filter(name = 'agecheck')
def agecheck(user,id):
    try:
        from datetime import date,datetime,time,timedelta
        job=postdetail.objects.get(id=id)
        max_age_req=job.max_age
        min_age_req=job.min_age
        user_dob=user.personal.Dateofbirth
        dt=date.today()
        user_age=dt-user_dob
        age_in_years=(int(user_age.days)//365)
        if age_in_years<=max_age_req:
            return 'eligible by age'
        # elif age_in_years > min_age_req: 
        #     return 'eligible by age'
        else:
            return 'Not eligible by age'

        
    except:
        return "can't check age"
@register.filter(name = 'gendercheck')
def gendercheck(user,id):
    try:
        
        job=postdetail.objects.get(id=id)
       
        user_gender=user.personal.gender
       
        if job.jobs_for == 'both':
            return 'Eligible by gender'
        elif  job.jobs_for== user_gender:
            return 'Eligible by gender'
        else:
            return 'Not eligible by gender'

        
    except:
        return "can't varify gender"

@register.filter(name = 'document_check')
def document_check(user):
    try:
        try:
            user.documentpics.matric
            return 'document uploaded'
        except:
            return 'Documents scan is required to apply on this job'
    except:
        return ''
        
@register.filter(name = 'allcheck')
def allcheck(user,id):
    job=postdetail.objects.get(id=id)
       
    try:
        if user.personal.qualific in list(job.whocanapply.all()):
            if user.personal.domicile in list(job.post_regions.all()):
                from datetime import date,datetime,time,timedelta
                max_age_req=job.max_age
                min_age_req=job.min_age
                user_dob=user.personal.Dateofbirth
                dt=date.today()
                user_age=dt-user_dob
                age_in_years=(int(user_age.days)//365)
                
                if age_in_years<=max_age_req:
                    user_gender=user.personal.gender
                    if job.jobs_for == 'both':
                        return True
                    elif  job.jobs_for== user_gender:
                        return True
                    else:
                        return False
                else:
                    return False
            else:
                False
        else:
            False

    except:
        return True
    
        


# appliedjobs ,postdetail
@register.filter(name = 'applied')
def applied(user,id):
    if user.is_anonymous:
        pass
    else:
        already=[]
        apply=appliedjobs.objects.filter(user=user) 
        for i in apply:
            already.append(i.appliedtojob.id)
        if id in already:
            return True
        else:
            return False
 
   

@register.filter(name = 'balancestatus')
def balancestatus(user,jobid):
    try:
        user.billing
        userbalance=user.billing.userbalance
        job=postdetail.objects.get(id=jobid)
        totaljobcost=job.total_cost
        if userbalance>=totaljobcost:
            return ''
        elif userbalance<totaljobcost:
            more=totaljobcost-userbalance
            return  more 
    except:
        return ''
        


@register.filter(name = 'applystatus')
def applystatus(user_id,jobslug):
     apply=appliedjobs.objects.get(user=user_id,slug=jobslug) 
     if apply.status==0:
         return 'pending'
     elif apply.status==1:
         return 'registeration_started'
     elif apply.status==2:
         return 'registeration done'
     elif apply.status==3:
         return 'some_problem'
     else:
         pass
        


@register.filter(name = 'unreadnotification')
def unreadnotification(user):
  jobs=appliedjobs.objects.filter(user=user)
  unread=[]
  for k in jobs:
        replies=k.askingquestion_set.all()
        for l in replies:
            if not l.read:
                unread.append(l.whattoask)
  return len(unread)
@register.filter(name ='makeread')
def makeread(user):
  jobs=appliedjobs.objects.filter(user=user)
  for k in jobs:
        for l in k.askingquestion_set.all():
            if not l.read:
                 l.read = True
                 l.save()
  return ''

@register.simple_tag(name='jobsposted')
def jobsposted():
    return postdetail.objects.all().count() *10
    
@register.simple_tag(name = 'jobsprocessed')
def jobsprocessed():
    return appliedjobs.objects.filter(status = 2 ).count() *213
    
@register.simple_tag(name ='jobsinprogress')
def jobsinprogress():
    return appliedjobs.objects.filter(status = 1).count() *213
 
    

