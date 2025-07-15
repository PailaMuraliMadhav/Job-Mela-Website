# 💼 JobMela – MERN Stack Job Portal

**JobMela** is a full-stack job portal built using the **MERN (MongoDB, Express, React, Node.js)** stack. It connects **students** searching for jobs with **recruiters** offering positions. The platform includes job filtering, resume upload, company profiles, OTP login, and admin features, providing a real-world job portal experience.

---

## 🌐 Live Demo

- 🔗 Frontend: [https://jobmela.vercel.app](https://jobmela.vercel.app)
- 🔗 Backend: [https://job-mela-website.onrender.com](https://job-mela-website.onrender.com)

---

## 🚀 Features

### 👨‍🎓 For Students
- 🔍 Search jobs by title, location, industry, or salary
- 📁 Upload and submit resume while applying
- ✨ View job details and apply easily
- 📧 Secure OTP-based email login
- 🎯 Motivational quotes rotation

### 🧑‍💼 For Recruiters
- 🏢 Create and manage company profiles
- 📢 Post new job openings
- 🧾 View applicants (with resume support)
- 📊 Login tracking for analytics

### 🛠 General
- ⚙️ JWT Authentication with cookies
- 🌙 Dark/Light mode toggle
- ☁️ Cloudinary for file uploads (profile & resumes)
- 📩 Nodemailer for email OTPs
- 📈 Role-based access control
- 🔒 Protected routes

---

## 🛠 Tech Stack

| Category   | Technologies                                  |
|------------|-----------------------------------------------|
| Frontend   | React.js, Redux Toolkit, Tailwind CSS, ShadCN |
| Backend    | Node.js, Express.js, Mongoose, MongoDB Atlas  |
| Auth       | JWT, Cookies, Nodemailer, bcryptjs            |
| File Upload| Cloudinary, Multer                            |
| Deployment | Vercel (frontend), Render (backend)           |

---

## 📦 Folder Structure

```
Job-Mela-Website/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── hooks/
│   └── main.jsx
```

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)
```
VITE_BACKEND_URL=https://job-mela-website.onrender.com
```

### Backend (`backend/.env`)
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> ⚠️ Never expose `.env` variables publicly.

---

## 💻 Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/PailaMuraliMadhav/Job-Mela-Website.git
cd Job-Mela-Website
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Navigate to: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment

### 🔹 Frontend – Vercel
- Deploy from GitHub repo
- Set `VITE_BACKEND_URL` in Vercel's Environment Variables

### 🔸 Backend – Render
- Create a Web Service
- Add `.env` variables in the Render dashboard
- Set Start Command: `node index.js`
- Ensure MongoDB IP whitelist includes `0.0.0.0/0`

---

## 📸 Screenshots

| Home Page                          | Job Details Page                   |
|------------------------------------|------------------------------------|
| ![](https://via.placeholder.com/400x200) | ![](https://via.placeholder.com/400x200) |

> You can replace placeholder images with real screenshots.

---

## 🧠 Skills & Concepts Used

- React hooks & component architecture
- Redux state management
- Express routing & middleware
- MongoDB modeling with Mongoose
- Nodemailer integration with Gmail
- File uploading with Multer + Cloudinary
- Responsive UI with Tailwind CSS
- Form validation and conditional rendering
- Deployment best practices

---

## 📣 Contributing

Contributions are welcome! Open a pull request or submit an issue.

---

## 👤 Author

**Murali Madhav Paila**  
GitHub: [@PailaMuraliMadhav](https://github.com/PailaMuraliMadhav)

---

## 📄 License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---