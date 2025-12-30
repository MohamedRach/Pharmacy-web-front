# Pharmacy Web Frontend

A web frontend application for managing pharmacies, built with **React** and **Vite**.  
The application provides user authentication (register / login) and pharmacy management features (CRUD, filtering), and communicates with a **Spring Boot REST API** secured with JWT.

---

## 🚀 Features

- User authentication (Register / Login)
- JWT-based authentication
- List pharmacies with filters:
  - City
  - Open 24h
  - On duty
- Create, update, and delete pharmacies (role-based access)
- Modal-based forms for create & update
- Clean separation between pages, components, and services
- Plain React + CSS (no UI frameworks)

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **Fetch API**
- **CSS**
- **React Router**
- **Spring Boot Backend (REST API)**

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MohamedRach/Pharmacy-web-front.git
cd pharmacy-web-front
npm install
npm run dev
```

## 🔐 Authentication

- **Authentication is handled using JWT.**

- **After login, the token is stored in localStorage.**

- **Protected API calls include the token in the Authorization header:**

-   Authorization: Bearer <token>

- **Signing out removes the token from localStorage and redirects the user to the login page.**

## Project Structure

src/
├── assets/                # Static assets (images, icons, etc.)
│
├── components/            # Reusable UI components
│   ├── CreatePharmacyForm.jsx
│   ├── LoginUserForm.jsx
│   ├── PharmacyTable.jsx
│   ├── RegisterUserForm.jsx
│   └── UpdatePharmacyForm.jsx
│
├── pages/                 # Page-level components (routing targets)
│   ├── LoginUserPage.jsx
│   ├── PharmacyPage.jsx
│   └── RegisterUserPage.jsx
│
├── services/              # API service layer
│   ├── AuthService.js     # Authentication API calls
│   └── PharmacyService.js # Pharmacy CRUD & filters API calls
│
├── App.jsx                # Main application component
├── App.css                # App-level styles
├── index.css              # Global styles
├── main.jsx               # Application entry point
│
public/                    # Public static files
node_modules/              # Dependencies
