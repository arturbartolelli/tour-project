package utils

import "errors"

var (
	ErrMissingEnv   = errors.New("env not found or not loaded")
	ErrWrongEnvType = errors.New("this env not match with selected type")
)
