from __future__ import unicode_literals

from django.db import models

from employer import models as employer_models

class Employee(models.Model):
	email = models.EmailField()
	first_name = models.CharField(max_length=50, null=True, blank=True)
	last_name = models.CharField(max_length=50, null=True, blank=True)
	hire_date = models.DateField(null=True, blank=True)
	employer = models.ForeignKey(employer_models.Employer)