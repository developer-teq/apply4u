from django.contrib.sitemaps import Sitemap
from django.contrib import sitemaps
from django.urls import reverse
from applyforjob.models import currentjobs,postdetail,jobnotifictions


class currentjobs_Sitemap(Sitemap):
        changefreq = "daily"
        priority = 1.0

        def items(self):
            return currentjobs.objects.all().order_by('-timestamp')

        # def location(self, obj):
        #     return obj.note_full_path
        def lastmod(self, obj):
            return obj.timestamp
class postdetail_Sitemap(Sitemap):
        changefreq = "daily"
        priority = 0.9

        def items(self):
            return postdetail.objects.all().order_by('-timestamp')

        # def location(self, obj):
        #     return obj.note_full_path
        def lastmod(self, obj):
            return obj.timestamp

# class appliedjobs_Sitemap(Sitemap):
#         changefreq = "daily"
#         priority = 0.7

#         def items(self):
#             return appliedjobs.objects.all()

#         # def location(self, obj):
#         #     return obj.note_full_path
#         def lastmod(self, obj):
#             return obj.timestamp

class jobnotifictions_Sitemap(Sitemap):
        changefreq = "daily"
        priority = 0.8

        def items(self):
            return jobnotifictions.objects.all()

        # def location(self, obj):
        #     return obj.note_full_path
        def lastmod(self, obj):
            return obj.timestamp


# class Post_Sitemap(Sitemap):
#     changefreq = "daily"
#     priority = 0.7
#     def items(self):
#             return Post.objects.all()

#     def lastmod(self, obj):
#             return obj.timestamp


