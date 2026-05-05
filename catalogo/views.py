from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db.models import Avg, Count, Q
from .models import Book, Review

def book_list(request):
    books = Book.objects.all().annotate(
        avg_rating=Avg("reviews__rating"),
        review_count=Count("reviews")
    )
    return render(request, "catalogo/book_list.html", {"books": books})

def book_detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)

    if request.method == "POST":
        rating = int(request.POST.get("rating"))
        comment = request.POST.get("comment")
        Review.objects.create(book=book, rating=rating, comment=comment)

        avg_rating = book.reviews.aggregate(Avg("rating"))["rating__avg"] or 0
        return JsonResponse({"avg_rating": avg_rating})

    reviews = book.reviews.all()
    avg_rating = book.reviews.aggregate(Avg("rating"))["rating__avg"]
    return render(request, "catalogo/book_detail.html", {
        "book": book,
        "reviews": reviews,
        "avg_rating": avg_rating
    })

def search_results(request):
    query = request.GET.get("q", "")
    filter_by = request.GET.get("filter", "title")
    order = request.GET.get("order", "asc")

    books = Book.objects.all().annotate(
        avg_rating=Avg("reviews__rating"),
        review_count=Count("reviews")
    )

    if query:
        if len(query) == 1 and query.isalnum():
            books = books.filter(title__istartswith=query)
        else:
            books = books.filter(Q(title__icontains=query) | Q(author__icontains=query))

    if order == "desc":
        books = books.order_by(f"-{filter_by}")
    else:
        books = books.order_by(filter_by)

    return render(request, "catalogo/search_results.html", {
        "books": books,
        "query": query,
        "filter_by": filter_by,
        "order": order
    })