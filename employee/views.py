from django.shortcuts import render
from rest_framework import viewsets

import serializers
import models

class EmployeeViewSet(viewsets.ModelViewSet):
	queryset = models.Employee.objects.all()
	serializer_class = serializers.EmployeeSerializer