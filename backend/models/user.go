package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	BaseModel

	Email    string `json:"email" gorm:"check:users_email_checker_lowercase_ck,email = LOWER(email);uniqueIndex:idx_users_email" validate:"required,email" query:"email"`
	Password string `json:"password,omitempty" validate:"omitempty,min=6" query:"password"`
	Name     string `json:"name" gorm:"index" validate:"required,min=3" query:"name"`

	UUID      uuid.UUID      `json:"uuid" gorm:"type:uuid;default:uuid_generate_v4()" query:"uuid"`
	DeletedAt gorm.DeletedAt `json:"deletedAt" gorm:"index"`
}
