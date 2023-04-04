FROM nginx:alpine
COPY /dist/codeshort-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf