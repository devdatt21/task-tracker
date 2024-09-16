// backend/main.go
package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/devdatt21/task-tracker/handlers"
	"github.com/devdatt21/task-tracker/middleware"
)
import "github.com/rs/cors"

// In the main function, before starting the server:
c := cors.New(cors.Options{
    AllowedOrigins: []string{"http://localhost:3000"},
    AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
    AllowedHeaders: []string{"Content-Type", "Authorization"},
})

handler := c.Handler(r)
log.Fatal(http.ListenAndServe(":8080", handler))


func main() {
	r := mux.NewRouter()

	// Public routes
	r.HandleFunc("/api/login", handlers.Login).Methods("POST")
	r.HandleFunc("/api/register", handlers.Register).Methods("POST")

	// Protected routes
	s := r.PathPrefix("/api").Subrouter()
	s.Use(middleware.JwtAuthentication)
	s.HandleFunc("/tasks", handlers.GetTasks).Methods("GET")
	s.HandleFunc("/tasks", handlers.CreateTask).Methods("POST")
	s.HandleFunc("/tasks/{id}", handlers.GetTask).Methods("GET")
	s.HandleFunc("/tasks/{id}", handlers.UpdateTask).Methods("PUT")
	s.HandleFunc("/tasks/{id}", handlers.DeleteTask).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8080", r))
}
