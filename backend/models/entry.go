package models

import "time"

type Entry struct {
	ID        string    `json:"id" gorm:"PrimaryKey"`
	Title     string    `json:"title"`
	Extension string    `json:"ext"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"-"`
	DeletedAt time.Time `json:"-"`
}
