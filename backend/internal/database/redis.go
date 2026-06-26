package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

var Redis *redis.Client

func ConnectRedis() {
	Redis = redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", os.Getenv("REDIS_HOST"), os.Getenv("REDIS_PORT")),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0,
	})

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := Redis.Ping(ctx).Err(); err != nil {
		if os.Getenv("APP_ENV") == "production" {
			log.Fatalf("❌ Gagal konek ke Redis: %v", err)
		} else {
			log.Printf("⚠️  Gagal konek ke Redis (development mode): %v", err)
			log.Println("⚠️  Aplikasi berjalan TANPA cache Redis")
			Redis = nil // Set to nil to handle missing redis gracefully
		}
		return
	}

	log.Println("✅ Redis terhubung")
}
