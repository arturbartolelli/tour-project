package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"main.go/models"
	"main.go/server/repositories"
	"main.go/utils"
	"net/http"
	"strconv"
)

func NewUser() *User {
	return &User{
		validator: validator.New(),
		//repo:      repositories.UserRepository{},
	}
}

type User struct {
	validator *validator.Validate
	repo      *repositories.UserRepository
}

func (u User) Create(ctx echo.Context) error {
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

func (u User) Update(ctx echo.Context) error {
	idStr := ctx.Param("id")

	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "id should be a number")
	}

	var data models.User
	if err := ctx.Bind(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to parse body")
	}

	if err := u.validator.Struct(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to validate body")
	}

	// todo -> finish this code ( implement DB )
	return utils.HTTPSucess(ctx, data)

}
func (u User) Delete(ctx echo.Context) error  { panic("implement me") }
func (u User) GetList(ctx echo.Context) error { panic("implement me") }
func (u User) Get(ctx echo.Context) error     { panic("implement me") }
