from backend.puzzle.views import image
from django.urls import path, include
from puzzle.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'puzzle', PuzzleView)
router.register(r'account', AccountView)
router.register(r'brand', BrandView)
router.register(r'collage', CollageView)
router.register(r'post', PostView)
router.register(r'comment', CommentView)
router.register(r'inventory', InventoryView)
router.register(r'theme', ThemeView)
router.register(r'image', ImageView)

urlpatterns = [
    path('', include(router.urls)),
]
