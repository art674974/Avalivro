from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

def home_redirect(request):
    return redirect("book_list")

urlpatterns = [
    path("", home_redirect),  # agora / redireciona para /catalogo/
    path("admin/", admin.site.urls),
    path("catalogo/", include("catalogo.urls")),
]