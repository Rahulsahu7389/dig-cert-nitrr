"""
import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
  print(f'Request: {self.request!r}')
"""

import os
from celery import Celery

# Set the default Django settings module for the 'celery' program
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Celery app
app = Celery('backend')

# Resolve Redis host and port from environment, with Docker defaults
redis_host = os.getenv("REDIS_HOST", "redis")
redis_port = os.getenv("REDIS_PORT", "6379")

CELERY_BROKER_URL = f"redis://{redis_host}:{redis_port}/0"

# Print the resolved broker URL for debugging
print(f"[CELERY CONFIG] CELERY_BROKER_URL={CELERY_BROKER_URL}")

# Assign broker URL directly to Celery app config
app.conf.broker_url = CELERY_BROKER_URL

# Load any Celery settings from Django with CELERY_ prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Autodiscover tasks across Django apps
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

