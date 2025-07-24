🏢 Meeting Room and Slot Booking System
A full-stack web application for booking meeting rooms and time slots within an organization. Built to simplify internal scheduling and avoid double bookings.

🚀 Features
📅 Slot Booking – Book available time slots for meeting rooms.
🏢 Room Management – Add, view, and manage multiple meeting rooms.
🔍 Conflict Detection – Prevents overlapping or double bookings.
📊 View Bookings – See all upcoming reservations.
🧑 User-Friendly Interface – Clean UI for effortless usage.

🛠️ Tech Stack
Frontend: React.js
Backend: Node.js + Express
Database: MySQL
Containerization: Docker, Docker Compose
Environment: .env.example for configuration management

📦 Installation
Clone the repo:
git clone https://github.com/SalamUddin844/meetly.git

Navigate to project:
cd meetly

Setup environment variables in .env file (set your own):
DB_HOST=mysql-db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=Booking

Run with Docker:
docker-compose up --build

Access:
Frontend: http://localhost
Backend API: http://localhost:5050/api/v1/ (check api with proper endpoint)

📁 Project Structure
/frontend     → React frontend
/backend      → Node.js Express backend
/docker-compose.yml

🔐 Environment Variables :
Make sure you have a .env file in your backend directory with proper DB config.

🧪 API Endpoints (Backend)
POST /api/v1/adduser – Add a new user
GET /api/v1/getalluser – Get all users
POST /api/v1/bookslot – Book a time slot
GET /api/v1/bookings – Fetch all bookings

✅ Future Improvements
User authentication (login system)
Role-based access (admin vs. normal user)
Room availability calendar view
Email notifications on booking

