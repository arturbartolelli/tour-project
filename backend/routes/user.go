package routes

import (
	"github.com/labstack/echo/v4"
	"main.go/constants"
	"main.go/server/controllers"
)

func User(app *echo.Group) {
	group := app.Group(string(constants.UserRoute))
	controller := controllers.NewUser()

	group.POST("", controller.Create)
	group.PUT("/:id", controller.Update)
	group.DELETE("/:id", controller.Delete)
	group.GET("", controller.GetList)
	group.GET("/:id", controller.Get)
}
