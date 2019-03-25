from webapp.models import Movie, Category, Hall, Seat, Show
from rest_framework import serializers
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('url', 'id', 'name', 'description')


class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class MovieCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')

    class Meta:
        model = Movie
        fields = ('url', 'id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'categories')


class MovieDisplaySerializer(MovieCreateSerializer):
    categories = InlineCategorySerializer(many=True, read_only=True)


class InlineSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'row', 'seat')


class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')

    # поле, представляющее обратную связь от зала к местам в зале.
    # название поля должно совпадать с related_name внешнего ключа от мест к залу.
    seats = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ('url', 'id', 'name', 'description', 'seats')


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')

    class Meta:
        model = Seat
        fields = ('url', 'id', 'row', 'seat', 'hall', 'hall_url')


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    movie_url = serializers.HyperlinkedRelatedField(view_name='api_v1:movie-detail', read_only=True, source='movie')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')
    hall_name = serializers.SerializerMethodField(read_only=True, source='hall')
    movie_name = serializers.SerializerMethodField(read_only=True, source='movie')

    def get_hall_name(self, show):
        return show.hall.name

    def get_movie_name(self, show):
        return show.movie.name

    class Meta:
        model = Show
        fields = ('url', 'id', 'movie', 'movie_url', 'hall', 'hall_url',
                  'starts_at', 'ends_at', 'ticket_price', 'hall_name', 'movie_name')


class UserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    # email = serializers.EmailField(required=True)
    # first_name = serializers.CharField(required=True)
    # last_name = serializers.CharField(required=True)
    # username = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email')
