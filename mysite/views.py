from django.db.models.query_utils import select_related_descend
from django.shortcuts import render
from django.http import HttpResponse

from dop.models import Music, Product


def index(request, **kwargs):

    def select_related(p, **kwargs):
        return {
            'all' : lambda : list({
                    'used_in_trailer' : True
                }, {
                    'used_in_trailer' : False
                })
        }

    product = Product.objects.all()[0]

    context = {
        'product' : {
            'id': '3727',
            'head_info': "Animated mockups collection for Final Cut Pro",
            'title': product.title,
            'productdetails' : {
                'meta_title': "This is title",
                'minimal_requirements' : product.minimal_requirements,
                'source_size' : product.source_size,
                'music': Music.objects,
            }
        },

        'test': 'test12'
    }

    return render(request, "index.jinja", context)
