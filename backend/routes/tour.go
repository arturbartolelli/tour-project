package routes

import (
	"github.com/labstack/echo/v4"
	"main.go/constants"
	"main.go/server/controllers"
	"main.go/server/repositories"
)

func Tour(app *echo.Group) {
	group := app.Group(string(constants.TourRoute))
	tourRep := repositories.TourRepo
	tourController := controllers.NewTour(tourRep)

	group.POST("", tourController.Create)
	group.PUT("/:id", tourController.Update)
	group.DELETE("/:id", tourController.Delete)
	group.GET("/:id", tourController.Get)
	group.GET("", tourController.GetList)
}
