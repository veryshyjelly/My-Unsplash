package main

import (
	"fmt"
	"my_unsplash/db"
	"my_unsplash/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	dB := db.DB{}
	dB.Connect()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	routes.SplashRoutes(app, &dB)

	fmt.Println("hello")

	app.Listen(":8080")
}
