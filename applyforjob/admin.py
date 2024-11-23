from django.contrib import admin
from .models import Organization,OrganizationImage,requestonline,complaints_rep,feedbacks,complaints, experiencepics,cashout,appliedcertificates, askingquestion,userreply,jobstepsreplies,Post,privacy_policy,jobnotifictions,education_category, Bachlor, master, personal,matric,Intermediate,mphil,doctorial,documentpics,currentjobs,postdetail,userwebrecord,appliedjobs,billing,addingbalance,mistakes,jobsectors,jobregion,Coupon, CouponUsage

# Register your models here.
from django.contrib.auth.models import User

class Inlinepersonal(admin.StackedInline):
    model=personal
class Inlinematric(admin.StackedInline):
    model=matric

class InlineIntermediate(admin.StackedInline):
    model=Intermediate


class Inlinedocumentpics(admin.StackedInline):
    model=documentpics

class InlineBachlor(admin.StackedInline):
    model=Bachlor

class Inlinemaster(admin.StackedInline):
    model=master

class Inlinemphil(admin.StackedInline):
    model=mphil
class Inlinedoctorial(admin.StackedInline):
    model=doctorial
class Inlinepersonal(admin.StackedInline):
    model=personal

class UserAdmin(admin.ModelAdmin):

    inlines=[Inlinematric,
    Inlinepersonal,
    InlineIntermediate,
    InlineBachlor,
    Inlinedocumentpics,
    Inlinemaster,
    Inlinemphil,
    Inlinedoctorial
    ]
    list_display = ('email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser')
    readonly_fields =('email', 'username', 'password')
    


admin.site.unregister(User)
admin.site.register(User, UserAdmin)




class personalAdmin(admin.ModelAdmin):
    
    list_display = ('user', 'full_name','qualific','father_name','address','gender','phone_number','cnic_number','father_cnic')
    # list_filter = ('user', 'full_name','father_name')
    search_fields = ['full_name', 'phone_number','cnic_number','address', ]
    list_filter = ('gender','domicile','qualific')
admin.site.register(personal, personalAdmin)





class matricAdmin(admin.ModelAdmin):
    list_display = ('user', 'title','board','marks','total_marks','result_date')
admin.site.register(matric, matricAdmin)


class IntermediateAdmin(admin.ModelAdmin):
    list_display = ('user','title','board','marks','total_marks','result_date')
admin.site.register(Intermediate, IntermediateAdmin)


admin.site.register(Bachlor)
admin.site.register(master)
admin.site.register(mphil)
admin.site.register(doctorial)
admin.site.register(documentpics)
class Inlinepostdetail(admin.StackedInline):
    model= postdetail
    filter_horizontal=('whocanapply', 'qualification_req', 'post_regions',)
    extra = 1

class currentjobsAdmin(admin.ModelAdmin):
    inlines = [Inlinepostdetail]
    list_display = ('jobtitle','oraganizational_data','newspaper','addate','lastdate','work')
    search_fields = ['jobtitle', 'lastdate' ]
    list_editable= ('oraganizational_data','work',)
admin.site.register(currentjobs, currentjobsAdmin)


class CouponAdmin(admin.ModelAdmin):
    list_display = ('code','discount','active','timestamp')
    search_fields = ['jobtitle', 'lastdate' ]
    list_editable= ('discount','active')
admin.site.register(Coupon, CouponAdmin)

class CouponUsageAdmin(admin.ModelAdmin):


    list_display = ('coupon','user','used_at')
    search_fields = ['user', 'coupon' ]
    list_filter = ("coupon",)
    
admin.site.register(CouponUsage, CouponUsageAdmin)


class postdetailAdmin(admin.ModelAdmin):
    list_display = ('post_name', 'cropedad', 'procedure', 'max_age', 'min_age', 'no_of_posts', 'bankfee', 'photocopies', 'posting_fee', 'service_fee', 'total_cost')
    list_display_links = ('post_name',)
    list_editable=  ('procedure', 'cropedad', 'max_age', 'min_age', 'no_of_posts', 'bankfee', 'photocopies', 'posting_fee', 'service_fee', 'total_cost')
    filter_horizontal=('whocanapply', 'qualification_req','post_regions',)
    search_fields = ['post_name', 'job_title__jobtitle', 'procedure']
    list_per_page = 5
    save_on_top = True
    
    class Media:
        js = ('https://photos.lookranks.com/easyscrollingadmin.js',)



admin.site.register(postdetail, postdetailAdmin)

class appliedjobsAdmin(admin.ModelAdmin):
    list_display = ('appliedtojob','user','joblastdate','alldone','status','ref_payment')
    search_fields = [ 'appliedtojob__post_name', 'user__username']
    @admin.display(ordering='appliedtojob__job_title__lastdate')
    def joblastdate(self, obj):
        return obj.appliedtojob.job_title.lastdate

admin.site.register(appliedjobs, appliedjobsAdmin)
admin.site.register(userwebrecord)

class billingAdmin(admin.ModelAdmin):
    list_display = ('user','accountmanagement','userlastpayment','earnings','trusted','timestamp','loancleared')
admin.site.register(billing, billingAdmin)

class cashoutAdmin(admin.ModelAdmin):
    list_display = ('user','cashout','payemntmathod','usertrnxid','cashout_done','timestamp','fraudingperson','comment')
admin.site.register(cashout, cashoutAdmin)


class addingbalanceAdmin(admin.ModelAdmin):
    list_display =  ('user','payment_adding','usertrnxid','depositslip','timestamp','varified','fraudingperson','comment')
admin.site.register(addingbalance, addingbalanceAdmin)
class mistakesAdmin(admin.ModelAdmin):
    list_display =  ('user','mistake','mistake_sol','solved','timestamp')
admin.site.register(mistakes, mistakesAdmin)





class education_categoryAdmin(admin.ModelAdmin):
    list_display = ('education','year_of')
admin.site.register(education_category, education_categoryAdmin)


class requestonlineAdmin(admin.ModelAdmin):
    list_display = ('user','I_want_to','discription','status','timestamp')
admin.site.register(requestonline, requestonlineAdmin)


admin.site.register(jobsectors)
admin.site.register(jobregion)
admin.site.register(jobnotifictions)

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
admin.site.register(Post, PostAdmin)

admin.site.register(privacy_policy)
admin.site.register(jobstepsreplies)
admin.site.register(askingquestion)
admin.site.register(userreply)
admin.site.register(appliedcertificates)
admin.site.register(experiencepics)
admin.site.register(feedbacks)
admin.site.register(complaints)
admin.site.register(complaints_rep)

class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name','meta_discription','description','website','phone_number','email')
    list_editable = ('meta_discription','description','website','phone_number','email')
    search_fields = [ 'name', 'description']

admin.site.register(Organization, OrganizationAdmin)
class OrganizationImageAdmin(admin.ModelAdmin):
    list_display = ('organization','image')
    search_fields = [ 'name']


admin.site.register(OrganizationImage, OrganizationImageAdmin)