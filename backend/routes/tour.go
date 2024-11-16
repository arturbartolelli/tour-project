package routes

import (
	"github.com/labstack/echo/v4"
	"main.go/constants"
	"main.go/server/controllers"
)

func Tour(app *echo.Group) {
	group := app.Group(string(constants.TourRoute))
	tourController := controllers.NewTour()

	group.POST("", tourController.Create)
	//group.PUT("/:id", controller.Update)
	group.DELETE("/:id", tourController.Delete)
}
