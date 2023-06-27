package routes

import (
	"my_unsplash/controllers"
	"my_unsplash/db"

	"github.com/gofiber/fiber/v2"
)

func SplashRoutes(app *fiber.App, db *db.DB) {
	app.Get("/image/:id", controllers.GetImage(db))
	app.Delete("/image/:id", controllers.DeleteImage(db))
	app.Get("/directory", controllers.GetDirectory(db))
	app.Post("/image", controllers.AddImage(db))
}
