from django.views.decorators.csrf import csrf_exempt
from webapp.models import Movie, Category, Hall, Seat, Show
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, CategorySerializer, HallSerializer, SeatSerializer, ShowSerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []


class MovieViewSet(NoAuthModelViewSet):
    queryset = Movie.objects.active().order_by('-release_date')
    serializer_class = MovieSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class CategoryViewSet(NoAuthModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class HallViewSet(NoAuthModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer


class SeatViewSet(NoAuthModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer


class ShowViewSet(NoAuthModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer
