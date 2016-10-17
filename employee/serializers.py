import models
from rest_framework import serializers

class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Employee
		fields = ('id', 'full_name', 'email', 'hire_date', 'employer')