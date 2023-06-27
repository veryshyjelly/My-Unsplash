package controllers

import (
	"io"
	"my_unsplash/db"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func AddImage(db *db.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		link := c.FormValue("link")
		title := c.FormValue("title")

		rep, err := http.Get(link)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).
				Send([]byte("error occurred while adding image " + err.Error()))
		}
		defer rep.Body.Close()

		// tp := rep.Header.Get("Content-Type")
		entry := db.NewEntry(title, "jpg")

		file, err := os.Create("data/images/" + entry.ID + "." + entry.Extension)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).
				Send([]byte("error occurred while adding image " + err.Error()))
		}
		defer file.Close()

		_, err = io.Copy(file, rep.Body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).
				Send([]byte("error occurred while adding image " + err.Error()))
		}

		return c.JSON(entry)
	}
}
