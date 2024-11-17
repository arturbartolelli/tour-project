package models

import "time"

type Tour struct {
	ID          int64     `json:"id"`
	UUID        string    `json:"uuid"`
	Reservation string    `json:"reservation"`
	Date        string    `json:"date"`
	Time        string    `json:"time"`
	City        string    `json:"city"`
	Price       float64   `json:"price"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
