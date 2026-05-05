from django.urls import path
from . import views

urlpatterns = [
    path("", views.book_list, name="book_list"),          # /catalogo/
    path("<int:book_id>/", views.book_detail, name="book_detail"),  # /catalogo/1/
    path("search/", views.search_results, name="search_results"),
]