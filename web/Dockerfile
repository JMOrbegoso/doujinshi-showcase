# Build stage
FROM node:lts AS build
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy code
COPY . .

# Configure environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build
RUN npm run build

# Production stage
FROM node:lts-alpine AS runner

# Install requeriments
RUN apk --no-cache add tzdata

# Create user
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Env
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV API_URL=http://doujinshi-showcase-api:8080

EXPOSE ${PORT}

WORKDIR /app

COPY --from=build --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nextjs /app/public ./public
COPY --from=build --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]
