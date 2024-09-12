package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"main.go/routes"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("error to load .env: %v", err)
	}
	// todo -> implement db
	//cfg, err := configs.LoadConfig()
	//if err != nil {
	//	log.Fatalf("error to load configs: %v", err)
	//}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	routes.Load(e)
	// todo -> implement db
	//port := cfg.API.Port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))

}
