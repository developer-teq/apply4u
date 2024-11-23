
"""
Django settings for applyforme project.

Generated by 'django-admin startproject' using Django 3.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path
                            
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
      
with open(os.path.join(BASE_DIR, 'secret_key.txt')) as f:
 SECRET_KEY=f.read().strip()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True 

 

# ALLOWED_HOSTS = ['localhost', '165.232.176.208','www.applyforme.pk','applyforme.pk']
ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'applyforjob',
    'crispy_forms',
    "registerme",
    "refferals",
    # 'storages',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google', 
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.instagram',
    # "corsheaders",
    'captcha',
]

SILENCED_SYSTEM_CHECKS = ['captcha.recaptcha_test_key_error']
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # "corsheaders.middleware.CorsMiddleware",
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

 

ROOT_URLCONF = 'applyforme.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
             
            ],
        },
    },
]


AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
   
)


# WSGI_APPLICATION = 'applyforme.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Karachi'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# all auth
SITE_ID = 1
LOGIN_REDIRECT_URL = '/uploadcv/'
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 3
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT =500

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
# ACCOUNT_AUTHENTICATION_METHOD ='email'
ACCOUNT_AUTHENTICATION_METHOD ='username_email'

# Provider specific settings


SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    },


'facebook':
       {'METHOD': 'oauth2',
        'SCOPE': ['email','public_profile', ],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'FIELDS': [
            'id',
            'first_name',
            'last_name',
        
            'name',
    
            'picture',

            ],
        'EXCHANGE_TOKEN': True,
        'LOCALE_FUNC': lambda request: 'kr_KR',
        'VERIFIED_EMAIL': False,
        'VERSION': 'v7.0'}
}
SOCIAL_AUTH_FACEBOOK_KEY = '1552482221783317'  # App ID
SOCIAL_AUTH_FACEBOOK_SECRET ='c6e1de67083f6cd26e8cb0101630ed8f' #app key

import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
STATIC_URL = '/staticfiles/'


MEDIA_URL = '/mediafiles/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles') 

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'staticfiles'),  # Add a 'static' folder for custom static files
]
# for stoping user brute force attack login attempts restrictions
# REST_FRAMEWORK = {
    
#     'DEFAULT_THROTTLE_CLASSES': (
#         'rest_framework.throttling.UserRateThrottle',

#     ),
#     'DEFAULT_THROTTLE_RATES': {
#         'loginAttempts': '3/hr',
#         'user': '1000/min',
#     }
# }



# HSTS settomgs
#SECURE_HSTS_SECONDS=31536000
# SECURE_HSTS_PRELOAD=True
# SECURE_HSTS_INCLUDE_SUBDOMAINS=True 
# CORS_ORIGIN_ALLOW_ALL = True   



EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'onclickapply@gmail.com'
EMAIL_HOST_PASSWORD ='qecidaomhcavcwaq'

EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'applyforme.pk Team <noreply@applyforme.pk>'
ACCOUNT_UNIQUE_EMAIL = True

# added some tesxt to test git 