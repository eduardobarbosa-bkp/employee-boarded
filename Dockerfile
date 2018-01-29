FROM nginx

# Configure for angular fallback routes
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built app to wwwroot
COPY dist /usr/share/nginx/html
