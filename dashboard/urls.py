from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers

from employee import views as employee_views

router = routers.DefaultRouter()
router.register(r'employees', employee_views.EmployeeViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('base.urls')),
    url(r'api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
