from django.contrib import admin


from .models import Profile
# Register your models here.


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user','recommended_by','updated','created', 'bio','code')
admin.site.register(Profile, ProfileAdmin)
