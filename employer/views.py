from django.shortcuts import render

from rest_framework import viewsets

import models
import serializers

class EmployerViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.EmployerSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			return models.Employer.objects.filter(id=user.employeradminaccount.employer_id)
		except Exception as e:
			return models.Employer.objects.none()