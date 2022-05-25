from django.contrib import admin
# from django.db.models import fields

from .models import Product, Music, MusicPortal

class MusicInline(admin.TabularInline):
    model = Music
    extra = 0

class ProductAdmin(admin.ModelAdmin):
    inlines = [
        MusicInline
    ]

admin.site.register(Product, ProductAdmin)
admin.site.register(MusicPortal)
