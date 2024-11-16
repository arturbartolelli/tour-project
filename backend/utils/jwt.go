package utils

import (
	"github.com/golang-jwt/jwt"
	"strconv"
	"time"
)

var jwtSecret = []byte("faz o l")

func GenerateJWT(userID int64) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &jwt.StandardClaims{
		ExpiresAt: expirationTime.Unix(),
		Issuer:    strconv.FormatInt(userID, 10),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
