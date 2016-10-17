from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers

from employer import views as employer_views
from employee import views as employee_views

router = routers.DefaultRouter()
router.register(r'employers', employer_views.EmployerViewSet, base_name='employer')
router.register(r'employees', employee_views.EmployeeViewSet, base_name='employee')

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('base.urls')),
    url(r'api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
