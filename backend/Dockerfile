FROM golang:1.22 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM scratch

WORKDIR /root/

COPY --from=builder /app/main .

# Copia o .env caso necessário
COPY .env .

EXPOSE 8080

CMD ["./main"]