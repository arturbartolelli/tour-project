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

func (u User) Login(ctx echo.Context) error {
	var credentials struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}

	if err := ctx.Bind(&credentials); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to parse body")
	}
	if err := u.validator.Struct(&credentials); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "invalid input")
	}

	user, err := u.repo.GetByEmail(credentials.Email)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusUnauthorized, err, "invalid email or password")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password)); err != nil {
		return utils.HTTPFail(ctx, http.StatusUnauthorized, err, "invalid email or password")
	}

	token, err := utils.GenerateJWT(user)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to generate token")
	}

	response := map[string]interface{}{
		"user":  user,
		"token": token,
	}
	return utils.HTTPSucess(ctx, response)
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

	token, err := utils.GenerateJWT(&data)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to generate token")
	}
	response := map[string]interface{}{
		"user":  data,
		"token": token,
	}
	return utils.HTTPCreated(ctx, response)
}

func (u User) Update(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "id should be a number")
	}

	var data struct {
		Email    *string `json:"email,omitempty"`
		Password *string `json:"password,omitempty"`
		Name     *string `json:"name,omitempty"`
		IsAdmin  *bool   `json:"isAdmin,omitempty"`
	}

	if err := ctx.Bind(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to parse body")
	}

	user, err := u.repo.Get(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return utils.HTTPFail(ctx, http.StatusNotFound, err, "user not found")
		}
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to retrieve user")
	}

	if data.Email != nil {
		user.Email = *data.Email
	}
	if data.Password != nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*data.Password), bcrypt.DefaultCost)
		if err != nil {
			return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to hash password")
		}
		user.Password = string(hashedPassword)
	}
	if data.Name != nil {
		user.Name = *data.Name
	}
	if data.IsAdmin != nil {
		user.IsAdmin = *data.IsAdmin
	}

	if err := u.repo.Update(id, user); err != nil {
		if err == sql.ErrNoRows {
			return utils.HTTPFail(ctx, http.StatusNotFound, err, "user not found")
		}
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to update user")
	}

	updatedUser, err := u.repo.Get(id)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to retrieve updated user")
	}

	return utils.HTTPSucess(ctx, updatedUser)
}

func (u User) Delete(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "id should be a number")
	}

	user, err := u.repo.Get(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return utils.HTTPFail(ctx, http.StatusNotFound, err, "user not found")
		}
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to retrieve user")
	}

	if err := u.repo.Delete(id); err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to delete user")
	}

	return utils.HTTPSucess(ctx, user)
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
