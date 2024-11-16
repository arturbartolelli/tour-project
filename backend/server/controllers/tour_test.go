package controllers

import (
	"database/sql"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"main.go/models"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

type MockTourRepository struct{}

func (m *MockTourRepository) GetList() ([]models.Tour, error) {
	return []models.Tour{
		{
			ID:          1,
			UUID:        "550e8400-e29b-41d4-a716-446655440000",
			Reservation: "John Doe",
			Date:        "2024-12-01",
			Time:        "10:00:00",
			City:        "Rio de Janeiro",
			Price:       150.00,
		},
	}, nil
}

func (m *MockTourRepository) Get(id int64) (*models.Tour, error) {
	if id == 1 {
		return &models.Tour{
			ID:          1,
			UUID:        "550e8400-e29b-41d4-a716-446655440000",
			Reservation: "John Doe",
			Date:        "2024-12-01",
			Time:        "10:00:00",
			City:        "Rio de Janeiro",
			Price:       150.00,
		}, nil
	}
	return nil, sql.ErrNoRows
}

func (m *MockTourRepository) Create(tour *models.Tour) error {
	return nil
}

func (m *MockTourRepository) Update(id int64, data *models.Tour) error {
	return nil
}

func (m *MockTourRepository) Delete(id int64) error {
	return nil
}

func TestGetTours(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/tour", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	repo := &MockTourRepository{}
	tourController := &Tour{repo: repo}

	if assert.NoError(t, tourController.GetList(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Contains(t, rec.Body.String(), "John Doe")
	}
}

func TestGetTourByID(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/tour/1", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetParamNames("id")
	c.SetParamValues("1")

	repo := &MockTourRepository{}
	tourController := &Tour{repo: repo}

	if assert.NoError(t, tourController.Get(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Contains(t, rec.Body.String(), "John Doe")
	}
}

func TestCreateTour(t *testing.T) {
	e := echo.New()
	body := `{
		"uuid": "660e8400-e29b-41d4-a716-446655440001",
		"reservation": "Jane Doe",
		"date": "2024-12-02",
		"time": "14:00:00",
		"city": "São Paulo",
		"price": 200.00
	}`
	req := httptest.NewRequest(http.MethodPost, "/tour", strings.NewReader(body))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	repo := &MockTourRepository{}
	tourController := &Tour{repo: repo}

	if assert.NoError(t, tourController.Create(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
	}
}

func TestUpdateTour(t *testing.T) {
	e := echo.New()
	body := `{
		"reservation": "Updated Reservation",
		"date": "2024-12-03",
		"time": "16:00:00",
		"city": "Brasília",
		"price": 250.00
	}`
	req := httptest.NewRequest(http.MethodPut, "/tour/1", strings.NewReader(body))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetParamNames("id")
	c.SetParamValues("1")

	repo := &MockTourRepository{}
	tourController := &Tour{repo: repo}

	if assert.NoError(t, tourController.Update(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestDeleteTour(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodDelete, "/tour/1", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetParamNames("id")
	c.SetParamValues("1")

	repo := &MockTourRepository{}
	tourController := &Tour{repo: repo}

	if assert.NoError(t, tourController.Delete(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}
