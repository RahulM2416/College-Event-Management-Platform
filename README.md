# 🎟️ College Event Management System 

🚀 A full-featured backend system for managing college events, user registrations, and generating **QR-based PDF tickets** using **Node.js, Express, MongoDB, and Mongoose**.

---

## 🧩 Features

✨ User Authentication (JWT)
🎉 Event Creation & Management
📝 Event Registration System
📄 Automatic PDF Ticket Generation
📱 QR Code Embedded Tickets
🔐 Protected Routes (Auth Middleware)
🚫 Duplicate Registration Prevention

---

## 🛠️ Tech Stack

* ⚙️ Node.js
* 🚀 Express.js
* 🍃 MongoDB + Mongoose
* 🔑 JWT Authentication
* 🔒 bcrypt.js (Password Hashing)
* 📄 PDFKit (Ticket Generation)
* 📱 QRCode (QR in Ticket)

---

## 📂 Project Structure

```
backend/
├── models/
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   └── registrationController.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── server.js
├── .env
└── package.json
```

---

## 🗄️ Database Design

📦 **Database: `college_app`**

* 👤 `users` → Stores user account details
* 🎯 `events` → Stores event details
* 📝 `registrations` → Links users with events

---

## 🔄 API Flow

1. 🔐 User registers / logs in → gets JWT
2. 🎉 Admin/User creates event
3. 📝 User registers for event
4. 📄 Backend:

   * Saves registration
   * Generates PDF ticket
   * Embeds QR Code
   * Sends file as response

---

## 🔗 API Endpoints

### 🔐 Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

### 🎉 Event Routes

```
POST /api/events      (Protected)
GET  /api/events
```

### 📝 Registration Route

```
POST /api/register    (Protected)
```

---

## 📱 QR Code System

Each ticket contains a QR with:

```json
{
  "userId": "...",
  "eventId": "...",
  "registrationId": "..."
}
```

👉 Can be used for:

* Entry verification
* Fake ticket prevention
* Scan-based check-in system

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repo

```bash
git clone <your-repo-url>
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

```
MONGO_URI=mongodb://127.0.0.1:27017/college_app
JWT_SECRET=your_secret_key
```

### 4️⃣ Run server

```bash
node server.js
```
---

## 🤝 Contributing

Feel free to fork, improve, and submit PRs 🚀

---

## ⭐ Show Some Love

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 Author

Made with ❤️ by **Rahul M**

---
