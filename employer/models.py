from __future__ import unicode_literals

from django.contrib.auth import models as auth_models
from django.db import models

class Employer(models.Model):
	name = models.CharField(max_length=100)

	def __str__(self):
		return self.name

class EmployerAdminAccount(models.Model):
	user = models.OneToOneField(
        auth_models.User,
        primary_key=True
    )
	employer = models.ForeignKey(Employer)