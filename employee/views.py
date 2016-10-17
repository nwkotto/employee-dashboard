from django.shortcuts import render
from rest_framework import viewsets

import serializers
import models
from employer import models as employer_models

class EmployeeViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.EmployeeSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			return models.Employee.objects.filter(employer=user.employeradminaccount.employer)
		except Exception as e:
			return models.Employee.objects.none()