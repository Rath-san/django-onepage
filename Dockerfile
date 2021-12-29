FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /spa
WORKDIR /spa
ADD requirements.txt /spa/
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD . /spa/
