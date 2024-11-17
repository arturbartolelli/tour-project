package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Load(app *echo.Echo) {

	authedGroup := app.Group("", middleware.Logger())

	User(authedGroup)
	Tour(authedGroup)
}
