from django.db.models.query_utils import select_related_descend
from django.shortcuts import render
from django.http import HttpResponse


def index(request, **kwargs):

    def select_related(p, **kwargs):
        return {
            'all' : lambda : [{
                    'used_in_trailer' : True
                }, {
                    'used_in_trailer' : False
                }]
            # {
            #     'filter' : lambda g : [{
            #         'used_in_trailer' : True
            #     }, {
            #         'used_in_trailer' : False
            #     }]
            # }
        }

        # product.productdetails.minimal_requirements
    context = {
        'product' : {
            'title': 'Test',
            'productdetails' : {
                'minimal_requirements' : 'a, b, c',
                'source_size' : 10000,
                'music' : {
                    'select_related' : select_related
                }
            }
        },

        'test': 'test12'
    }

    return render(request, "index.jinja", context)
