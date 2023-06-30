# My-Unsplash

My-Unsplash is a web application that allows users to upload, view, and delete photos. It provides a masonry layout to display the uploaded photos and includes features such as labels and delete buttons on hover.

## Features

- Display photos in a masonry layout.
- Show labels and delete buttons when hovering over a photo.
- Ability to delete photos from the application.

## Tech Stack

- Frontend:
  - React: JavaScript library for building user interfaces.
  - Tailwind CSS: Utility-first CSS framework.
- Backend:
  - Go (Golang): Programming language for the backend.
  - SQLite: Lightweight and embedded database.
  - GORM: Go ORM library for database access.
  - Fiber: Web framework for building APIs in Go.

## Getting Started

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your machine.
- Go: Install Go by following the instructions provided at [golang.org](https://golang.org/doc/install).
- SQLite: Ensure that SQLite is installed on your system.

### Installation

1. Clone the repository:

```shell
   git clone https://github.com/veryshyjelly/My-Unsplash.git
   cd my-unsplash
```

2. Frontend setup:
```shell
   cd frontend
   npm install
```
3. Backend setup:
```shell
   cd ../backend
   go mod download
```

### Running the Application
1. Start the backend server:
```shell
   cd backend
   go run main.go
```

2. Start the frontend development server:
```shell
   cd frontend
   npm run dev
```

3. Open your web browser and visit `http://localhost:3000` to see the My-Unsplash application.

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

### License
[Apache License](github.com/veryshyjelly/My-Unsplash/LICENSE)

### Acknowledgments
- This project was inspired by the Unsplash website
- Thanks to the developers and contributors of React, Tailwind CSS, Go, SQLite, GORM and Gofiber for their excellent tools and libraries.