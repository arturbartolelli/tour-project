package repositories

import (
	"context"
	"database/sql"
	"main.go/configs"
	"main.go/models"
	"time"
)

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

func (r *TourRepository) Delete(id int64) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	_, err := r.postgres.ExecContext(ctx, "DELETE FROM tours WHERE id = $1", id)
	return err
}
