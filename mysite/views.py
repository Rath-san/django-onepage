from django.db.models.query_utils import select_related_descend
from django.shortcuts import render
from django.http import HttpResponse
from jinja2 import Template

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

    def get_product(id):
        return product

    def get_promo_valid_info(id):
        return 'Promo info test'

    def price(price):
        return '89'
    
    def get_products(ids):
        return map(lambda x: product, ids)

    context = {
        'get_products': get_products,
        'price': price,
        'get_product': get_product,
        'get_promo_valid_info': get_promo_valid_info,
        'product' : {
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

    return render(request, "mtransition_noise.jinja", context)
