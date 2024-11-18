package utils

import (
	"github.com/joho/godotenv"
	"go.uber.org/zap"
	"log"
	"main.go/constants"
	"os"
)

var Defaults = map[string]interface{}{
	constants.ApiPort:      "your_port",
	constants.PostgresHost: "your_host",
	constants.PostgresPort: "5432",
	constants.PostgresUser: "your_user",
	constants.PostgresPass: "your_pass",
	constants.PostgresName: "your_name",
}

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("Warning: no .env file found. This is fine if running in a production environment.")
	}

	for key := range Defaults {
		if value := os.Getenv(key); value != "" {
			Defaults[key] = value
		}
	}
}

func EnvString(key string) string {
	valueInterface, ok := Defaults[key]
	if !ok {
		zap.L().Fatal("missing env", zap.Error(ErrMissingEnv), zap.String("env", key))
	}

	value, ok := valueInterface.(string)
	if !ok {
		zap.L().Fatal("wrong type", zap.Error(ErrWrongEnvType), zap.String("env", key))
	}

	return value
}
