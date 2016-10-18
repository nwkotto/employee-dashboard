from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView, RedirectView
from django.urls import reverse

from rest_framework import routers

from base import views as base_views
from employer import views as employer_views
from employee import views as employee_views

router = routers.DefaultRouter()
router.register(r'employers', employer_views.EmployerViewSet, base_name='employer')
router.register(r'employees', employee_views.EmployeeViewSet, base_name='employee')

admin.site.site_header = 'Employee Dashboard'

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api/current-user/$', base_views.CurrentUserView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^((.+/)+)?$', login_required(TemplateView.as_view(template_name='main/dashboard.html')), name='dashboard-home')
]