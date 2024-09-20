package repositories

import (
	"database/sql"
	"main.go/models"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) GetList() ([]models.User, error) {
	var users []models.User
	rows, err := r.db.Query("SELECT id, name, email FROM users")
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
	err := r.db.QueryRow("SELECT id, name, email FROM users WHERE id = ?", id).Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Create(user *models.User) error {
	_, err := r.db.Exec("INSERT INTO users (uuid, name, email) VALUES (?, ?, ?)", user.UUID, user.Name, user.Email)
	return err
}

func (r *UserRepository) Update(id int64, data *models.User) error {
	_, err := r.db.Exec("UPDATE users SET name = ?, email = ? WHERE id = ?", data.Name, data.Email, id)
	return err
}

func (r *UserRepository) Delete(id int64) error {
	_, err := r.db.Exec("DELETE FROM users WHERE id = ?", id)
	return err
}
