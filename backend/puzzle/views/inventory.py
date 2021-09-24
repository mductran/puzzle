from rest_framework.viewsets import ModelViewSet
from puzzle.models import Inventory
from puzzle.serializers import InventorySerializer
from puzzle.permissions import InventoryPermissions
# Create your views here.


class InventoryView(ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

    permission_classes = [InventoryPermissions, ]
