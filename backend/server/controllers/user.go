package controllers

import (
	"database/sql"
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"main.go/models"
	"main.go/server/repositories"
	"main.go/utils"
	"net/http"
	"strconv"
)

func NewUser() *User {
	return &User{
		validator: validator.New(),
		repo:      repositories.UserRepo,
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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to hash password")
	}
	data.Password = string(hashedPassword)

	if err := u.repo.Create(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to create user")
	}

	return utils.HTTPCreated(ctx, data)
}

// Update an existing user
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

	if data.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
		if err != nil {
			return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to hash password")
		}
		data.Password = string(hashedPassword)
	}

	// Atualiza o usuário no repositório
	if err := u.repo.Update(id, &data); err != nil {
		if err == sql.ErrNoRows {
			return utils.HTTPFail(ctx, http.StatusNotFound, err, "user not found")
		}
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to update user")
	}

	return utils.HTTPSucess(ctx, "user updated successfully")
}

// Delete a user
func (u User) Delete(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "id should be a number")
	}

	if err := u.repo.Delete(id); err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to delete user")
	}

	return utils.HTTPSucess(ctx, "user deleted successfully")
}

func (u User) Get(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "id should be a number")
	}

	user, err := u.repo.Get(id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return utils.HTTPFail(ctx, http.StatusNotFound, err, "user not found")
		}
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to get user")
	}

	return utils.HTTPSucess(ctx, user)
}

func (u User) GetList(ctx echo.Context) error {
	users, err := u.repo.GetList()
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to get users list")
	}

	return utils.HTTPSucess(ctx, users)
}
