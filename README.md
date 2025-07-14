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

Job-Mela-Website/
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── utils/
│ └── index.js
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── hooks/
│ └── main.jsx


🌍 Deployment
🔹 Frontend – Vercel
Deploy from GitHub repo

Set VITE_BACKEND_URL in Vercel's Environment Variables

🔸 Backend – Render
Create a Web Service

Add .env variables in the Render dashboard

Set Start Command: node index.js

Ensure MongoDB IP whitelist includes 0.0.0.0/0


📣 Contributing
Contributions are welcome! Open a pull request or submit an issue.

👤 Author
Murali Madhav Paila
GitHub: @PailaMuraliMadhav

📄 License
This project is licensed under the MIT License. See LICENSE for details.

