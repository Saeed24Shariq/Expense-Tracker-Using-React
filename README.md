# 💰 Expense Tracker App

An Expense Tracker application built using React JS for the frontend and a mini backend in Express JS.
Instead of a traditional database, this project uses a CSV file for data storage, making it lightweight and easy to understand for learning purposes.

### 🚀 Features

* Add income and expense records

* View total income and total expenses

* Categorized expense tracking

* Data persistence using a CSV file

* Simple REST API with Express JS

* Clean and responsive UI built with React

### 🛠️ Tech Stack
#### Frontend

* React JS

* Redux (if used)

* Tailwind CSS / CSS (if applicable)

#### Backend

* Node.js

* Express JS

* CSV file handling (fs, papaparse, etc.)

### 📊 Data Storage

* All expense and income data is stored in a CSV file

* CSV operations include:

  * Reading data

  * Writing new records

  * Updating totals dynamically

* This approach is useful for:

  * Learning backend fundamentals

  * Understanding file-based storage

  * Small-scale applications

### 🔗 API Endpoints
#### Method	Endpoint	Description
* GET	/report	Fetch total income & expenses

* POST	/add-expense	Add a new expense

* POST	/delete-expense	Delete an expense
