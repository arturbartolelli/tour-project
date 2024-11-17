package utils

import (
	"github.com/golang-jwt/jwt"
	"main.go/models"
	"time"
)

var jwtSecret = []byte("faz o l")

type UserClaims struct {
	ID      uint   `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	IsAdmin bool   `json:"isAdmin"`
	UUID    string `json:"uuid"`
}

type CustomClaims struct {
	User UserClaims `json:"user"`
	jwt.StandardClaims
}

func GenerateJWT(user *models.User) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &CustomClaims{
		User: UserClaims{
			ID:      user.ID,
			Email:   user.Email,
			Name:    user.Name,
			IsAdmin: user.IsAdmin,
			UUID:    user.UUID.String(),
		},
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			Issuer:    "Turistando Ceará",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
