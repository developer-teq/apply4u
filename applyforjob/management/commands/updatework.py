from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Updates the work field for all currentjobs objects whose lastdate has passed'

    def handle(self, *args, **options):
        from applyforjob.models import currentjobs
        for job in currentjobs.objects.all():
            job.update_work()
