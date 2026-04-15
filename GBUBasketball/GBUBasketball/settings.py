from pathlib import Path
from dotenv import load_dotenv
import os
import dj_database_url  # pip install dj-database-url

load_dotenv()  # loads your .env file

BASE_DIR = Path(__file__).resolve().parent.parent

# ── Security ──────────────────────────────────────────────
SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-key-for-local-only')
# os.environ.get() reads from the environment after load_dotenv() runs
# the second argument is a default, used only if the key is missing

DEBUG = os.environ.get('DEBUG', 'False') == 'True'
# compares the string 'True' because env vars are always strings

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')
# in your .env:            ALLOWED_HOSTS=localhost,127.0.0.1
# on Render/Railway:       ALLOWED_HOSTS=yourapp.onrender.com

# ── Apps ──────────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "matches",
    "gallery",
    "notifications",
    "teams",
    'corsheaders',
    'rest_framework',
]

# ── Middleware ─────────────────────────────────────────────
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # must stay at top
    'django.middleware.security.SecurityMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ── CORS ───────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = os.environ.get(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:3000'
).split(',')
# in .env:        CORS_ALLOWED_ORIGINS=http://localhost:3000
# on production:  CORS_ALLOWED_ORIGINS=https://yourfrontend.vercel.app

# ── URLs / WSGI ────────────────────────────────────────────
ROOT_URLCONF = "GBUBasketball.urls"
WSGI_APPLICATION = "GBUBasketball.wsgi.application"

# ── Templates ─────────────────────────────────────────────
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

# ── Database (Neon PostgreSQL) ─────────────────────────────
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,       # keeps connections alive for 10 min (performance)
        ssl_require=True,       # Neon requires SSL, this enforces it
    )
}
# dj_database_url.config() reads the DATABASE_URL env var and converts it
# into the dict format Django expects, automatically detecting PostgreSQL

# ── Static & Media files ───────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
# STATIC_ROOT is where `collectstatic` gathers all static files for production

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ── Auth validators ────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ── i18n ──────────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"  # changed from UTC since you're in India
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"