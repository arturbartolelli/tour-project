package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"main.go/configs"
	"main.go/routes"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("error to load .env: %v", err)
	}

	cfg, err := configs.LoadConfig()
	if err != nil {
		log.Fatalf("error to load configs: %v", err)
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	routes.Load(e)

	port := cfg.API.Port
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))

}
