import models
from rest_framework import serializers

class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Employee
		fields = ('id', 'first_name', 'last_name', 'full_name', 'email', 'hire_date', 'employer')