from django.urls import path, include
from puzzle.views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'puzzles', PuzzleView)
router.register(r'accounts', AccountView)
router.register(r'collages', CollageView)
router.register(r'posts', PostView)
router.register(r'comments', CommentView)
router.register(r'inventories', InventoryView)
router.register(r'images', ImageView)
router.register(r'trades', TradeView)
router.register(r'offers', OfferView)

urlpatterns = [
    path('', include(router.urls)),
    path('login', CookieTokenObtainPairView.as_view()),
    path('logout', BlacklistRefreshView.as_view()),
    path('refresh', CookieTokenRefreshView.as_view()),
    path('me', CurrentUserView.as_view()),
]
