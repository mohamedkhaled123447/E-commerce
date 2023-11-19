from rest_framework.filters import BaseFilterBackend


class ProductsFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        seller = request.query_params.get("seller", None)
        category = request.query_params.get("category", None)
        name = request.query_params.get("name", None)
        if seller:
            queryset = queryset.filter(seller=seller)
        if category:
            queryset = queryset.filter(category=category)
        if name:
            queryset = queryset.filter(name=name)
        return queryset