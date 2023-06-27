package controllers

import (
	"my_unsplash/db"

	"github.com/gofiber/fiber/v2"
)

func GetDirectory(db *db.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.JSON(db.GetDirectory())
	}
}
