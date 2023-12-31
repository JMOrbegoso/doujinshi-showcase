# Build stage
FROM golang:latest AS build
WORKDIR /app

# Install dependencies
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy code
COPY . .

# Generate swagger docs
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -o ./presentation/docs

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /build

# Production stage
FROM alpine:latest AS runner

# Install requeriments
RUN apk --no-cache add tzdata

# Create user
RUN addgroup --system --gid 1001 golang
RUN adduser --system --uid 1001 golang

# Env
ENV LIBRARY_DIR="/library"
ENV PORT=8080
ENV SERVER_URL=http://doujinshi-showcase-server:80

EXPOSE ${PORT}

COPY --from=build --chown=golang:golang /build/. /app

VOLUME [ "/library" ]

USER golang

CMD [ "/app" ]
