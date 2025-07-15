import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const app = express();

// ✅ Middleware for JSON parsing, cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Whitelist both local + production frontend URLs
const whitelist = [
  "https://jobmela.vercel.app",
  "http://localhost:5173",
];
console.log("CORS Whitelist:", whitelist);

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming Origin:", origin);
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // ✅ allow cookies to be sent
};

// ✅ Enable CORS
app.use(cors(corsOptions));

// ✅ Optional: Debug incoming cookies and origin
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  console.log("Cookies:", req.cookies);
  next();
});

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running at port ${PORT}`);
});
