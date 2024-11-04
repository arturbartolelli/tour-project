package configs

import (
	"database/sql"
	"fmt"
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

func GetDBConnection() *sql.DB {
	cfg, err := LoadConfig()
	if err != nil {
		log.Fatalf("erro to load configs: %v", err)
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
		cfg.DB.Host, cfg.DB.Port, cfg.DB.User, cfg.DB.Pass, cfg.DB.Database,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("erro ao conectar ao banco de dados: %v", err)
	}

	if err = db.Ping(); err != nil {
		log.Fatalf("erro ao verificar a conexão com o banco de dados: %v", err)
	}

	return db
}
