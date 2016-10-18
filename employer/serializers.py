from rest_framework import serializers
import models

class EmployerSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Employer
		fields = ('id', 'name')