package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"main.go/models"
	"main.go/utils"
	"net/http"
)

type UserController struct {
	validator *validator.Validate
}

func NewUser() *UserController {
	return &UserController{
		validator: validator.New(),
	}
}

func (u UserController) Create(ctx echo.Context) error {
	var data models.User

	if err := ctx.Bind(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to parse body")
	}

	data.UUID = uuid.New()

	if err := u.validator.Struct(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to validate body")
	}

	return utils.HTTPCreated(ctx, data)
}

func (u UserController) Update(ctx echo.Context) error  { panic("implement me") }
func (u UserController) Delete(ctx echo.Context) error  { panic("implement me") }
func (u UserController) GetList(ctx echo.Context) error { panic("implement me") }
func (u UserController) Get(ctx echo.Context) error     { panic("implement me") }
