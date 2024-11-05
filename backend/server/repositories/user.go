package repositories

import (
	"context"
	"database/sql"
	"main.go/configs"
	"main.go/models"
	"time"
)

var UserRepo *UserRepository

func init() {
	UserRepo = &UserRepository{
		postgres: configs.GetDBConnection(),
		timeout:  5 * time.Second,
	}
}

type UserRepository struct {
	timeout  time.Duration
	postgres *sql.DB
}

func NewUserRepository() *UserRepository {
	return &UserRepository{
		postgres: configs.GetDBConnection(),
		timeout:  5 * time.Second,
	}
}

func (r *UserRepository) GetList() ([]models.User, error) {
	var users []models.User
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	rows, err := r.postgres.QueryContext(ctx, "SELECT id, name, email FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func (r *UserRepository) Get(id int64) (*models.User, error) {
	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	err := r.postgres.QueryRowContext(ctx, "SELECT id, uuid, name, email, password, created_at, updated_at FROM users WHERE id = $1", id).
		Scan(&user.ID, &user.UUID, &user.Name, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Create(user *models.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	err := r.postgres.QueryRowContext(ctx,
		"INSERT INTO users (uuid, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
		user.UUID, user.Name, user.Email, user.Password).Scan(&user.ID)

	return err
}

func (r *UserRepository) Update(id int64, data *models.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	result, err := r.postgres.ExecContext(ctx,
		"UPDATE users SET name = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4",
		data.Name, data.Email, data.Password, id)

	if err != nil {
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *UserRepository) Delete(id int64) error {
	ctx, cancel := context.WithTimeout(context.Background(), r.timeout)
	defer cancel()

	_, err := r.postgres.ExecContext(ctx, "DELETE FROM users WHERE id = $1", id)
	return err
}
