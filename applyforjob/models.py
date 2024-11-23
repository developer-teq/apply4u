from django.db import models
from django.contrib.auth.models import User
from django.db.models import CASCADE
from django.urls import reverse
from django.utils.text import slugify
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.html import escape
# Create your models here.


STATUS = (
    (0,"Draft"),
    (1,"Publish")
)

class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='blog_posts')
    updated_on = models.DateTimeField(auto_now= True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title
class privacy_policy(models.Model):
    terms = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.terms


class jobsectors(models.Model):
    sector= models.CharField(max_length = 150, blank = True, null = True)
    def __str__(self):
        return "%s" % self.sector       
class jobregion(models.Model):
    regions= models.CharField(max_length = 150, blank = True, null = True)
    def __str__(self):
        return "%s" % self.regions


class education_category(models.Model):
    year_of=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    education= models.CharField(max_length = 150, blank = True, null = True)
    def __str__(self):
        return "%s" % self.education
    class Meta:
        ordering = ('year_of','education')



class Organization(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=40,unique=True ,default='latest')
    meta_discription=models.CharField(max_length = 150,default='apply for latest today jobs')
    organization_type = models.CharField(max_length=50, blank= True, null=True)
    sectorlogo = models.ImageField(upload_to = 'pictures/logos', null = True, blank = True)
    adpic = models.ImageField(upload_to = 'pictures/organization', null = True, blank = True)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(max_length=200, blank= True, null=True)
    location = models.CharField(max_length=100, blank= True, null=True)
    phone_number = models.CharField(max_length=20, blank= True, null=True)
    email = models.EmailField(max_length=50, blank= True, null=True)

    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._get_unique_slug()
        super(Organization, self).save(*args, **kwargs)
    
    def _get_unique_slug(self):
        slug = slugify(self.name)
        unique_slug = slug
        num = 1
        while Organization.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug
class OrganizationImage(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='pictures/organization_images')

    def __str__(self):
        return f"{self.organization.name} - {self.image.name}"

  


class personal(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    slug = models.SlugField(max_length=40,unique=True ,default='thisisuer')
    full_name = models.CharField(max_length = 150, blank = True, null = True)
    Dateofbirth=models.DateField(max_length=8, blank = True, null = True)
    father_name=models.CharField(max_length = 150, blank = True, null = True)
    address = models.CharField(max_length = 150, blank = True, null = True)
    domicile=models.ForeignKey(to=jobregion,on_delete=models.SET_NULL, null=True)
    qualific=models.ForeignKey(to=education_category,related_name='qualific',on_delete=models.SET_NULL, null=True)
    gender = models.CharField(max_length = 20, default = "female", choices = (("male", "male"), ("female", "female")))
    create_date = models.DateTimeField(auto_now_add = True)
    phone_number = models.CharField(max_length=18, blank = True, null = True)
    get_alerts_by = models.CharField(max_length = 30, default = "whatsapp and phone both", choices = (("phone", "phone"), ("Whasapp messages", "Whasapp messages"),("whatsapp and phone both", "whatsapp and phone both"),("No alerts", "No alerts")))
    send_education_based_jobs_alerts=models.ForeignKey(to=education_category,related_name='send_education_based_jobs_alerts',on_delete=models.SET_NULL, null=True)
    cnic_number = models.CharField(max_length=18, blank = True, null = True)
    father_cnic=models.CharField(max_length=18, blank = True, null = True)
    My_Father_is = models.CharField(max_length = 20, default = "alive", choices = (("alive", "alive"), ("not alive", "not alive")))
    datavarified= models.BooleanField(default = False)
    verified_at = models.DateTimeField(auto_now_add = False, null=True,blank=True)
    verified_time=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)

    def __str__(self):
        return "%s" % self.user
    def get_absolute_url(self):
        return reverse('applyforjob:mycv', args = [self.slug, ])

    def save(self, *args, **kwargs):
        if self.slug:
            self.slug = slugify(self.user)
        
        super(personal, self).save(*args, **kwargs)
    
class matric(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    title=models.CharField(max_length = 150 , blank = True, null = True)
    board=models.CharField(max_length = 150, blank = True, null = True)
    marks=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    total_marks=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    result_date=models.DateField(max_length=8, blank = True, null = True)
    def __str__(self):
        return "%s" % self.user

class Intermediate(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    title=models.CharField(max_length = 150, blank = True, null = True)
    board=models.CharField(max_length = 150, blank = True, null = True)
    marks=models.FloatField(null=True,blank=True)
    total_marks=models.FloatField(null=True,blank=True)
    result_date=models.DateField(max_length=8, blank = True, null = True)
    def __str__(self):
        return "%s" % self.user

class Bachlor(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    title=models.CharField(max_length = 150, blank = True, null = True)
    board=models.CharField(max_length = 150, blank = True, null = True)
    marks=models.FloatField(null=True,blank=True)
    total_marks=models.FloatField(null=True,blank=True)
    result_date=models.DateField(max_length=8, blank = True, null = True)
    def __str__(self):
        return "%s" % self.user

class master(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    title=models.CharField(max_length = 150, blank = True, null = True)
    board=models.CharField(max_length = 150, blank = True, null = True)
    marks=models.FloatField(null=True,blank=True)
    total_marks=models.FloatField(null=True,blank=True)
    result_date=models.DateField(max_length=8, blank = True, null = True)
    def __str__(self):
        return "%s" % self.user
class mphil(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    title=models.CharField(max_length = 150, blank = True, null = True)
    university=models.CharField(max_length = 200, blank = True, null = True)
    cgpa=models.FloatField(null=True,blank=True)
    total_cgpa=models.FloatField(null=True,blank=True)
    result_date=models.DateField(max_length=8, blank = True, null = True)
    def __str__(self):
        return "%s" % self.user
class doctorial(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    title=models.CharField(max_length = 150, blank = True, null = True)
    university=models.CharField(max_length = 200, blank = True, null = True)
    cgpa=models.FloatField(null=True,blank=True)
    total_cgpa=models.FloatField(null=True,blank=True)
    result_date=models.DateField(max_length=8, blank = True, null = True)
    def __str__(self):
        return "%s" % self.user


 
def get_upload_path(instance, filename):
    return 'pictures/{0}/{1}'.format(instance.user.username, filename)

class documentpics(models.Model):
    user = models.OneToOneField(to = User, on_delete = CASCADE, blank = True)
    picture = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    matric = models.ImageField(upload_to = get_upload_path, null = True, blank= True)
    inter = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    bachlor = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    master = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    mphil = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    doctor = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    cnic_front = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    cnic_back = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    upload_cv = models.FileField(upload_to=get_upload_path, null = True, blank = True)
    Father_cnic=models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return "%s" % self.user

class experiencepics(models.Model):
    user= models.ForeignKey(User, on_delete= models.CASCADE)
    title=models.CharField(max_length = 200, blank = True, null = True)
    duration=models.CharField(max_length = 200, blank = True, null = True)
    docscan = models.ImageField(upload_to = get_upload_path, null = True, blank = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return "%s" % self.user


applystatus = (
    (0,"Our team will do it for you"),
    (1,"Last date is passed"),
    (2,"Service is unavailable due to less time interval"),
    (3,"We are not providing services for this job")
)
from django.utils import timezone
class currentjobs(models.Model):
    jobtitle=models.CharField(max_length = 150)
    posts=models.CharField(max_length = 150,default='nonposted')
    meta_discription=models.CharField(max_length = 150,default='apply for latest today jobs')
    slug = models.SlugField(max_length=25,blank=True)
    sectorinfo=models.TextField(blank=True, null=True)
    sector=models.ForeignKey(to = jobsectors, on_delete = models.SET_NULL, null=True )
    oraganizational_data=models.ForeignKey(to = Organization, related_name='jobs', on_delete = models.SET_NULL, null=True )
    newspaper=models.CharField(max_length = 150)
    addate=models.DateField(max_length=8)
    sectorlogo = models.ImageField(upload_to = 'pictures/logos', null = True, blank = True)
    adpic = models.ImageField(upload_to = 'pictures/ads', null = True, blank = True)
    full_add = models.FileField(upload_to = 'pictures/full_adds', null = True, blank = True) 
    lastdate=models.DateField(max_length=8)
    work = models.IntegerField(choices=applystatus, default=0)
    timestamp = models.DateTimeField(auto_now_add = True)


    def __str__(self):
        return "%s" % self.jobtitle
    def get_absolute_url(self):
        return reverse('applyforjob:jobdetail', args = [self.slug, ])

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.jobtitle)
        super().save(*args, **kwargs)

    def update_work(self):
        now = timezone.now().date()
        if self.lastdate < now:
            self.work = 1  # set work to "Last date is passed"
        self.save()
 
class postdetail(models.Model):
    job_title=models.ForeignKey(to = currentjobs,related_name='details', on_delete = models.SET_NULL, null=True )
    post_name=models.CharField(max_length = 150,default='nonposted')
    slug = models.SlugField(max_length=50, unique=True,blank=True,null=True)
    cropedad = models.ImageField(upload_to = 'pictures/croped', null = True, blank = True)
    procedure=models.TextField(default='')
    experience=models.CharField(max_length = 200,default='')
    qualification_req=models.ManyToManyField(education_category,related_name='qualification_req', blank = True)
    sector=models.ForeignKey(to = jobsectors, on_delete = models.SET_NULL, null=True )
    whocanapply=models.ManyToManyField(education_category,related_name='whocanapply' , blank = True)
    post_regions=models.ManyToManyField(to = jobregion, related_name='post_regions', blank = True )
    jobs_for = models.CharField(max_length = 20, default = "male", choices = (("male", "male"), ("female", "female"),("both", "both")))
    document_scan_required = models.CharField(max_length = 15, default = "no", choices = (("no", "no"), ("yes", "yes")))
    max_age=models.PositiveSmallIntegerField(blank = True, null = True)
    min_age=models.PositiveSmallIntegerField(blank = True, null = True)
    no_of_posts=models.PositiveSmallIntegerField( blank = True, null = True)
    bankfee=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    photocopies=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    posting_fee=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    service_fee=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    total_cost=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    ref_commission=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return "%s" % self.post_name

    
    def save(self, *args, **kwargs):
        self.total_cost = self.bankfee+self.photocopies+self.posting_fee+self.service_fee
        
        self.ref_commission=self.service_fee * (0.2)
        if not self.slug:
            self.slug = self._get_unique_slug()
        super(postdetail, self).save(*args, **kwargs)

    def _get_unique_slug(self):
        slug = slugify(self.post_name)
        unique_slug = slug
        num = 1
        while postdetail.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    def get_absolute_url(self):
        return reverse('applyforjob:applythis', args = [self.slug, ])



STATUS = (
    (0,"pending"),
    (1,"registeration_started"),
    (2,"registeration done"),
    (3,"some_problem")

)

referal_payment = (
    (0,"pending"),
    (1,"registeration_started"),
    (2,"can_get_balance"),
    (3,"balance_transfered"),
   

)

class appliedjobsManager(models.Manager):
    def create_appliedjobs(self, user,appliedtojob):
        appliedjobs = self.create(user=user,appliedtojob=appliedtojob)
        # do something with the appliedjobs
        return appliedjobs


class appliedjobs(models.Model):
    user = models.ForeignKey(to = User, on_delete = models.SET_NULL, null=True )
    slug = models.SlugField(max_length=25,unique=True, blank=True)
    appliedtojob = models.ForeignKey(postdetail, on_delete=models.SET_NULL, null=True, related_name = "appliedtojobof")
    # post=models.CharField(max_length = 150, default='nonpost')
    # applieddate = models.DateField(max_length=8,null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add = True)
    # pending =models.BooleanField(default = False)
    alldone = models.BooleanField(default = False)
    comment=models.CharField(max_length = 150, null=True, blank=True)
    status = models.IntegerField(choices=STATUS, default=0)
    ref_payment= models.IntegerField(choices=referal_payment, default=0)
    # objects = appliedjobsManager()

    def __str__(self):
        return "%s" % self.appliedtojob
    def get_absolute_url(self):
        return reverse('applyforjob:applythis', args = [self.slug, ])
    def get_absolute_url_detail(self):
        return reverse('applyforjob:applieddetail', args = [self.slug, ])


    # def save(self, *args, **kwargs):
    #     self.slug = slugify(self.id)
    #     super(appliedjobs, self).save(*args, **kwargs)

    def _get_unique_slug(self):
        slug = slugify(self.appliedtojob)
        unique_slug = slug
        num =self.id
        while appliedjobs.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
        return unique_slug
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._get_unique_slug()
        super().save(*args, **kwargs)


class appliedcertificates(models.Model):
    # user should see thess====slips , and registeration certificates, and postticket upload,
    appliedjob = models.ForeignKey(to = appliedjobs, on_delete = models.SET_NULL, null=True )
    purpose=models.CharField(max_length = 70, default='')
    description=models.CharField(max_length = 200, default='')
    depositslip = models.FileField(upload_to = 'pictures/appliedjobs', null = True, blank = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return "%s" % self.purpose



# chenged question to job below
class jobstepsreplies(models.Model):
    job = models.ForeignKey(appliedjobs,on_delete = CASCADE, blank = True)
    steps = models.CharField(max_length = 150, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add = True)
    alldone = models.BooleanField(default = False)
    def __str__(self):
        return "%s" % self.steps


   
class jobnotifictions(models.Model):
    tojob=models.ForeignKey(to = currentjobs, on_delete = models.SET_NULL, null=True ,related_name='tojobof')
    slug = models.SlugField(max_length=50, unique=True,blank=True,null=True)
    notice=models.CharField(max_length = 150, null=True, blank=True)
    notice_pic = models.ImageField(upload_to = 'pictures', null = True, blank = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    alldone = models.BooleanField(default = False)
    def __str__(self):
        return "%s" % self.notice
   
    def get_absolute_url(self):
        return reverse('applyforjob:jobnotifictionsurl', args = [self.slug, ])
    def _get_unique_slug(self):
        slug = slugify(self.notice)
        unique_slug = slug
        num = 1
        while postdetail.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._get_unique_slug()
        super().save(*args, **kwargs)

class billing(models.Model):
    user = models.OneToOneField(to = User,on_delete = models.SET_NULL, null=True)
    userbalance =models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    accountmanagement=models.SmallIntegerField(null=True,default=0)
    userloan =models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    userlastpayment =models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    trusted = models.BooleanField(default = False)
    loancleared = models.BooleanField(default = False)
    earnings=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    
    def __str__(self):
        return "%s" % self.accountmanagement

class addingbalance(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    payment_adding=models.PositiveSmallIntegerField(default = 0)
    usertrnxid= models.PositiveSmallIntegerField(default = 0,validators=[MinValueValidator(1), MaxValueValidator(999999999)])
    depositslip = models.ImageField(upload_to = 'pictures', null = True, blank = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    varified = models.BooleanField(default = False)
    fraudingperson = models.BooleanField(default = False)
    comment=models.CharField(max_length = 150, null=True, blank=True)
    
    def __str__(self):
        return "%s" % self.user

# for more data required
# weour own developement usage=====i need a model inwhich i save user other details,like website registeration passwords, website links, 
# user upload via ===== user extra document required should be save



class cashout(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    cashout=models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    payemntmathod=models.CharField(max_length = 20, default = "JazzCash", choices = (("JazzCash", "JazzCash"), ("Easypaisa", "Easypaisa")))
    usertrnxid= models.PositiveSmallIntegerField(default = 0, blank = True, null = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    cashout_done = models.BooleanField(default = False)
    fraudingperson = models.BooleanField(default = False)
    comment=models.CharField(max_length = 150, null=True, blank=True)
    
    def __str__(self):
        return "%s" % self.user
class userwebrecord(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    web_name=models.CharField(max_length = 50)
    web_pass=models.CharField(max_length = 50)
    reg_date = models.DateTimeField(auto_now = True)
    doc = models.ImageField(upload_to = 'pictures/extra/', null = True, blank = True)
    timestamp = models.DateTimeField(auto_now_add = True)
    intertained = models.BooleanField(default = False)
    def __str__(self):
        return "%s" % self.web_name



class askingquestion(models.Model):
    job=models.ForeignKey(to=appliedjobs,on_delete = models.SET_NULL, null=True)
    whattoask=models.CharField(max_length = 200)
    read=models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return "%s" % self.whattoask
    class Meta:
        ordering = ["timestamp"]
class userreply(models.Model):
    job=models.ForeignKey(to=askingquestion,on_delete = models.SET_NULL, null=True)
    extradocument = models.ImageField(upload_to ='pictures/extra/', null = True, blank = True)
    userreply=models.CharField(max_length = 200)
    read=models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return "%s" % self.userreply
    class Meta:
        ordering = ["timestamp"]

class mistakes(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    mistake=models.CharField(max_length = 100)
    mistake_sol=models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add = True)
    solved = models.BooleanField(default = False)
    def __str__(self):
            return "%s" % self.mistake




class feedbacks(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    title=models.CharField(max_length = 200, null=True, blank=True)
    discription=models.TextField(blank=True)
    
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
            return "%s" % self.discription
   
class complaints(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    title=models.CharField(max_length = 200, null=True, blank=True)
    problem=models.TextField(blank=True)
    
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
            return "%s" % self.problem
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class complaints_rep(models.Model):
    complints=models.ForeignKey(to=complaints,on_delete = models.SET_NULL, null=True)
    reply=models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
            return "%s" % self.reply

class requestonline(models.Model):
    user=models.ForeignKey(to=User,on_delete = models.SET_NULL, null=True)
    I_want_to=models.CharField(max_length = 200)
    discription=models.TextField(blank=True, null=True)
    screenshot_of_ad = models.ImageField(upload_to ='pictures/requestdata/', null = True, blank = True)
    status=models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add = True)
    def __str__(self):
            return "%s" % self.I_want_to
    

class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.code
class CouponUsage(models.Model):
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    used_at = models.DateTimeField(auto_now_add = True)

# we have a window where we ask from users for more info if requeired in registrations,

# or make a view that check user given data and job registrations data , and find out which data is required for this
# and by this way we can aske the user that data directely after applying to jobs page, this may happen via templatetags,
#  and an other model 
# for this solution i have to make all user data list and store that to every user ,below is best way link
# make a seperate model that is onetoone field to post detail job, where i add every job registration required data 
# in list , and then use these both list comparison and show extra data required
# https://stackoverflow.com/questions/1110153/what-is-the-most-efficient-way-to-store-a-list-in-the-django-models
#>>>>extra data required via call is best for satisfaction