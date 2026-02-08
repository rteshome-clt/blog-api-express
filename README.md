# Blog API with Express

A RESTful blog API built with Node.js and Express that supports full CRUD operations with file-based persistence.

## Project Overview
This project is a backend API for managing blog posts. It allows users to create, read, update, delete, and list posts through HTTP endpoints. Blog data is stored locally in a JSON file that is generated automatically at runtime.

The project was developed as part of a backend web development course to practice RESTful API design, request validation, and server-side JavaScript.

## Technologies Used
- Node.js
- Express.js
- JavaScript (ES Modules)
- File System (`fs/promises`)
- date-fns (timestamp formatting)
- Bash & curl (API testing)

## Features
- RESTful CRUD API for blog posts
- Automatic ID generation and timestamps
- File-based persistence (JSON)
- Input validation and error handling
- Meaningful HTTP status codes
- Modular service-based architecture
- Automated endpoint testing via Bash script


## How to Access and Run the Project

### Step 1: Clone the Respository
  Open a terminal and run:
```bash
git clone https://github.com/your-username/blog-api-express.git
cd blog-api-express
```
### Step 2: Install Dependencies
```
  npm install
```

### Step 3: Start the Server
```
  node server.js
```
  Once the server is running it ill be available at
```
    http://localhost:3000
```

### Step 4: Run Automated Tests
```
  chmod +x test.sh
  ./test.sh
```
