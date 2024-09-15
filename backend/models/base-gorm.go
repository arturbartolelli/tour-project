package models

import (
	"gorm.io/gorm"
	"time"
)

type BaseModel struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updatedAt" gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `json:"deletedAt" gorm:"index"`
}
