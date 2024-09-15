package utils

import (
	"encoding/json"
	"github.com/labstack/echo/v4"
	"main.go/models"
	"net/http"
)

func HTTPCreated(ctx echo.Context, data interface{}) error {
	return ctx.JSON(http.StatusCreated, &models.HTTPResponse{
		Data: data,
	})
}

func HTTPFail(ctx echo.Context, code int, err error, message string) error {
	errJson, _ := json.Marshal(err)

	result := &models.HTTPErrorResponse{
		Error:   errJson,
		Message: message,
	}

	if err != nil {
		result.ErrorMessage = err.Error()
	}

	return ctx.JSON(code, result)
}

// TODO -> Better treatment before return
func HTTPSucess(ctx echo.Context, data interface{}) error {
	return ctx.JSON(http.StatusOK, &models.HTTPResponse{
		Data: data,
	})
}
