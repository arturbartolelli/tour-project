package controllers

import (
	"database/sql"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"main.go/models"
	"main.go/server/repositories"
	"main.go/utils"
	"net/http"
	"strconv"
)

func NewTour() *Tour {
	return &Tour{
		validator: validator.New(),
		repo:      repositories.TourRepo,
	}
}

type Tour struct {
	validator *validator.Validate
	repo      *repositories.TourRepository
}

func (t Tour) Create(ctx echo.Context) error {
	var data models.Tour

	// Bind dos dados da requisição
	if err := ctx.Bind(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to parse body")
	}

	// Gera um UUID para o passeio
	data.UUID = uuid.New().String()

	// Validação dos dados da requisição
	if err := t.validator.Struct(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "failed to validate body")
	}

	// Cria o tour no repositório
	if err := t.repo.Create(&data); err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to create tour")
	}

	return utils.HTTPCreated(ctx, data)
}

func (t Tour) Delete(ctx echo.Context) error {
	idStr := ctx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return utils.HTTPFail(ctx, http.StatusBadRequest, err, "id should be a number")
	}

	tour, err := t.repo.Get(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return utils.HTTPFail(ctx, http.StatusNotFound, err, "tour not found")
		}
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to retrieve tour")
	}

	if err := t.repo.Delete(id); err != nil {
		return utils.HTTPFail(ctx, http.StatusInternalServerError, err, "failed to delete tour")
	}

	return utils.HTTPSucess(ctx, tour)
}
