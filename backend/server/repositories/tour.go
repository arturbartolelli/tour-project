package repositories

import (
	"context"
	"database/sql"
	"main.go/configs"
	"main.go/models"
	"time"
)

type TourRepositoryInterface interface {
	Get(id int64) (*models.Tour, error)
	GetList() ([]models.Tour, error)
	Create(tour *models.Tour) error
	Update(id int64, data *models.Tour) error
	Delete(id int64) error
}

var TourRepo *TourRepository

func init() {
	TourRepo = &TourRepository{
		postgres: configs.GetDBConnection(),
		timeout:  5 * time.Second,
	}
}

type TourRepository struct {
	timeout  time.Duration
	postgres *sql.DB
}

func (r *TourRepository) Create(tour *models.Tour) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	err := r.postgres.QueryRowContext(ctx,
		"INSERT INTO tours (uuid, reservation, date, time, city, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at, updated_at",
		tour.UUID, tour.Reservation, tour.Date, tour.Time, tour.City, tour.Price).
		Scan(&tour.ID, &tour.CreatedAt, &tour.UpdatedAt)

	return err
}

func (r *TourRepository) Update(id int64, data *models.Tour) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	result, err := r.postgres.ExecContext(ctx,
		"UPDATE tours SET reservation = $1, date = $2, time = $3, city = $4, price = $5, updated_at = NOW() WHERE id = $6",
		data.Reservation, data.Date, data.Time, data.City, data.Price, id)

	if err != nil {
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *TourRepository) Get(id int64) (*models.Tour, error) {
	var tour models.Tour
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	err := r.postgres.QueryRowContext(ctx, "SELECT id, uuid, reservation, date, time, city, price, created_at, updated_at FROM tours WHERE id = $1", id).
		Scan(&tour.ID, &tour.UUID, &tour.Reservation, &tour.Date, &tour.Time, &tour.City, &tour.Price, &tour.CreatedAt, &tour.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &tour, nil
}

func (r *TourRepository) GetList() ([]models.Tour, error) {
	var tours []models.Tour
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	rows, err := r.postgres.QueryContext(ctx, "SELECT id, uuid, reservation, date, time, city, price, created_at, updated_at FROM tours")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var tour models.Tour
		if err := rows.Scan(&tour.ID, &tour.UUID, &tour.Reservation, &tour.Date, &tour.Time, &tour.City, &tour.Price, &tour.CreatedAt, &tour.UpdatedAt); err != nil {
			return nil, err
		}
		tours = append(tours, tour)
	}

	return tours, nil
}

func (r *TourRepository) Delete(id int64) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	_, err := r.postgres.ExecContext(ctx, "DELETE FROM tours WHERE id = $1", id)
	return err
}
