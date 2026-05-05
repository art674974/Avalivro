from django.contrib import admin
from .models import Book, Review

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author")
    search_fields = ("title", "author")
    list_filter = ("author",)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("book", "rating", "created_at")
    list_filter = ("rating", "created_at")

