// backend/handlers/auth.go
package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/devdatt21/task-tracker/backend/middleware"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Login(w http.ResponseWriter, r *http.Request) {
	// Implement user authentication logic here
	// For simplicity, we'll just create a token with a dummy user ID
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": primitive.NewObjectID().Hex(),
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(middleware.JwtKey)
	if err != nil {
		http.Error(w, "Error creating token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func Register(w http.ResponseWriter, r *http.Request) {
	// Implement user registration logic here
	// For simplicity, we'll just return a success message
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
}
