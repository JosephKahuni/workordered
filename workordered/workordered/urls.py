from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("operators/", include("operators.urls")),
    path("managers/", include("managers.urls")),
    path("supervisors/", include("supervisors.urls")),
    path("technicians/", include("technicians.urls")),
    path("stores", include("stores.urls")),
    path("machines", include("machines.urls")),
]
 