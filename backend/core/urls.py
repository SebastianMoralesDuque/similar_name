from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('data/', include('persons.urls')),  # Incluir las URLs de users
    path('', include('users.urls')),  # Incluir las URLs de users

]
