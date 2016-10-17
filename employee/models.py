from __future__ import unicode_literals

from django.db import models

from employer import models as employer_models

class Employee(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    hire_date = models.DateField(null=True, blank=True)
    employer = models.ForeignKey(employer_models.Employer)

    def _get_full_name(self):
        return '%s %s' % (self.first_name, self.last_name)
    full_name = property(_get_full_name)

    def __str__(self):
    	return self.full_name