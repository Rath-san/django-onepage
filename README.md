# **django-onepage (dop)**

## **About**
The core of this project is a simple single page app made with `django` (docker), with proxy server for styling and js es compile in `gulp`. Additionally, there are tasks for handling responsive image generation and video compression.
<br>
<br>

## **Tech**
### **Back:**
+ Python Django server, (bare bones), sqlite db

### **Front:**
+ Jinja2 template language for html, interpolation w django data model,
+ styles => **`scss`** (single file)
+ scripts => es6 modules with iife output (single file)
+ dev server **`browsersync`** => proxy to back

### **Utils:**
+ `sharp` for image processing
+ `ffmpeg` courtesy of [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static) for video processing
<br>

## **Instalation**
### **Backend**
Make sure you have installed docker on your work machine.
```
docker-compose up -d
```
> ##### _in `docker-compose.yml` file there is a setup for **djangno** container, also migrations._
<br>

Attach shell to docker container and create admin for django backend.
```
manage.py createsuperuser
```
> ##### _go with instructions prompts_
<br>

On [localhost:8000](http://localhost:8000) it should look like mess, but thats good.
<br>
<br>

### **Frontend**
Using terminal in directory w `package.json` run command:
```
npm i
```
> ##### _this will install all required packages_
<br>

Launch dev server via:
```
npm run dev
```
> ##### _tasks can be inspected in `gulpfile.js`_
<br>

On [localhost:3000](http://localhost:3000) it should look all good now.
<br>
<br>
