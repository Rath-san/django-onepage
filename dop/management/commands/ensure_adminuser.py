import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

NAME = 'DJANGO_SUPERUSER_USERNAME'
EMAIL = 'DJANGO_SUPERUSER_EMAIL'
PASS = 'DJANGO_SUPERUSER_PASSWORD'

class Command(BaseCommand):
    help = "Creates an admin user non-interactively if it doesn't exist"

    def add_arguments(self, parser):
        parser.add_argument('--username', help="Admin's username")
        parser.add_argument('--email', help="Admin's email")
        parser.add_argument('--password', help="Admin's password")

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username=options['username']).exists():
            print('Creating admin')
            User.objects.create_superuser(username=os.environ[NAME] or options['username'],
                                          email=os.environ[EMAIL] or options['email'],
                                          password=os.environ[PASS] or options['password'])
