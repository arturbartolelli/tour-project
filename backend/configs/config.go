package configs

import (
	"log"
	"main.go/constants"
	"main.go/models"
	"main.go/utils"
)

func LoadConfig() (*models.Config, error) {
	cfg := &models.Config{
		API: models.APIConfig{
			Port: utils.EnvString(constants.ApiPort),
		},
		DB: models.DBConfig{
			Host:     utils.EnvString(constants.PostgresHost),
			Port:     utils.EnvString(constants.PostgresPort),
			User:     utils.EnvString(constants.PostgresUser),
			Pass:     utils.EnvString(constants.PostgresPass),
			Database: utils.EnvString(constants.PostgresName),
		},
	}

	return cfg, nil
}

func GetDBConfig() *models.DBConfig {
	cfg, err := LoadConfig()
	if err != nil {
		log.Fatalf("erro to load configs: %v", err)
	}
	return &cfg.DB
}
