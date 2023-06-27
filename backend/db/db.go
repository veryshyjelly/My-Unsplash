package db

import (
	"log"
	"my_unsplash/models"
	"os"
	"time"

	"github.com/google/uuid"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DB struct {
	db *gorm.DB
}

func (db *DB) Connect() {
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second, // Slow SQL threshold
			LogLevel:                  logger.Info, // Log level
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,
		},
	)

	d, err := gorm.Open(sqlite.Open("data/directory.db"), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		panic("failed to connect to database")
	}

	d.AutoMigrate(&models.Entry{})

	db.db = d
}

func (db *DB) GetDirectory() []models.Entry {
	var result []models.Entry

	db.db.Model(&models.Entry{}).Find(&result)

	return result
}

func (db *DB) GetEntry(id string) models.Entry {
	var result models.Entry

	db.db.Model(&models.Entry{}).Find(&result, "id = ?", id)

	return result
}

func (db *DB) DeleteEntry(id string) error {
	return db.db.Delete(&models.Entry{}, "id = ?", id).Error
}

func (db *DB) NewEntry(title string, ext string) models.Entry {
	newID := uuid.New().String()

	newEntry := models.Entry{
		ID:        newID,
		Title:     title,
		Extension: ext,
	}

	db.db.Create(&newEntry)

	return newEntry
}
