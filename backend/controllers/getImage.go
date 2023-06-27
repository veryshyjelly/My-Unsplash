package controllers

import (
	"my_unsplash/db"

	"github.com/gofiber/fiber/v2"
)

func GetImage(db *db.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")

		entry := db.GetEntry(id)
		if entry.ID == "" {
			return c.Status(fiber.StatusNotFound).Send([]byte("requested image not found"))
		}

		return c.SendFile("data/images/" + entry.ID + "." + entry.Extension)
	}
}
