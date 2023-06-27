package controllers

import (
	"my_unsplash/db"

	"github.com/gofiber/fiber/v2"
)

func DeleteImage(db *db.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")

		err := db.DeleteEntry(id)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
		}

		return c.Send([]byte("image deleted successfully"))
	}
}
