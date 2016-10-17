from rest_framework import serializers
import models

class EmployerSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Employer
		fields = ('id', 'name')