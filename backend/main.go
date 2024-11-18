package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"main.go/configs"
	"main.go/routes"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Warning: no .env file found, continuing without it: %v", err)
	}

	_, err = configs.LoadConfig()
	if err != nil {
		log.Fatalf("error to load configs: %v", err)
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	routes.Load(e)

	port := os.Getenv("API_PORT")
	if port == "" {
		port = "8080"
	}

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
