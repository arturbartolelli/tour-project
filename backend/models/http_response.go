package models

import "encoding/json"

type HTTPResponse struct {
	Data interface{} `json:"data"`
}

type HTTPErrorResponse struct {
	Error        json.RawMessage `json:"error,omitempty"`
	ErrorMessage string          `json:"errorMessage,omitempty"`
	Message      string          `json:"message"`
}

type CreateTodoResponse struct {
	ID int `json:"id"`
}

type DeleteTodoResponse struct {
	Message string `json:"message"`
}

type UpdateTodoResponse struct {
	Message string `json:"message"`
}
