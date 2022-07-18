import math
from decimal import Decimal
from django.contrib.humanize.templatetags.humanize import intcomma

from django import template

register = template.Library()


@register.filter
def price(price):
    if not price:
        return 0

    if type(price) == str:
        price = Decimal(price)

    result = math.modf(price)

    if result[0] == 0:
        return round(price, 0)

    return price


@register.filter
def dollars(price):
    if not price:
        return 0
    price = round(float(price), 2)
    return "{}{}".format(intcomma(int(price)), ("%0.2f" % price)[-3:])
