from django.urls import path, include
from puzzle.views import *
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'puzzles', PuzzleView)
router.register(r'accounts', AccountView)
router.register(r'brands', BrandView)
router.register(r'collages', CollageView)
router.register(r'posts', PostView)
router.register(r'comments', CommentView)
router.register(r'inventories', InventoryView)
router.register(r'themes', ThemeView)
router.register(r'images', ImageView)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/login/', CustomTokenObtainPairView.as_view()),
    path('accounts/refresh/', TokenRefreshView.as_view())
]
