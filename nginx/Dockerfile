# FROM nginx:1.21.0-alpine

# RUN rm -rf /usr/share/nginx/html/*

# COPY build /usr/share/nginx/html

# COPY static /usr/share/nginx/django_static

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# CMD ["nginx", "-g", "daemon off;"]



# #new
# nginx/Dockerfile

FROM nginx:1.21.0-alpine

# Clean the default html directory
RUN rm -rf /usr/share/nginx/html/*

# Optional: Add your own nginx config
# Uncomment and add your nginx.conf if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static files will be mounted via docker-compose, so no COPY here

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]