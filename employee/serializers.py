import models
from rest_framework import serializers

class EmployeeSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Employee
		fields = ('id', 'first_name', 'last_name', 'email', 'hire_date', 'employer')