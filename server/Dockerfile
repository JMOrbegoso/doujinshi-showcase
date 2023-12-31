FROM nginx:alpine3.18

# Install requeriments
RUN apk --no-cache add tzdata

RUN chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Env
ENV PORT=80

# Volumes
VOLUME [ "/library" ]

## Copy the nginx.conf
COPY --chown=nginx:nginx "nginx.conf" "/etc/nginx/nginx.conf"

EXPOSE ${PORT}
