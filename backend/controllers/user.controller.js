// ✅ user.controller.js (FINAL VERSION)
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import nodemailer from "nodemailer";

// OTP Generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for JobMela Login",
    text: `Your OTP is: ${otp}`,
  });
};

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !password || !role || !file)
      return res.status(400).json({ message: "Missing fields", success: false });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists", success: false });

    const fileUri = getDataUri(file);
    const cloudUpload = await cloudinary.uploader.upload(fileUri.content);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: cloudUpload.secure_url },
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role)
      return res.status(400).json({ message: "Missing credentials", success: false });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid email or password", success: false });

    if (role !== user.role)
      return res.status(400).json({ message: "Role mismatch", success: false });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.trackLogin();
    await user.save();
    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || new Date() > user.otpExpiry)
      return res.status(400).json({ message: "Invalid or expired OTP", success: false });

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    const options = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 86400000),
    };

    const users = await User.find({});
    let totalStudentLogins = 0,
        totalRecruiterLogins = 0,
        totalActiveUsers = 0;

    users.forEach(u => {
      if (u.studentLogin) totalStudentLogins++;
      if (u.recruiterLogin) totalRecruiterLogins++;
      if (u.studentLogin || u.recruiterLogin) totalActiveUsers++;
    });

    res.status(200).cookie("token", token, options).json({
      message: `Welcome back ${user.fullname}`,
      user,
      totalActiveUsers,
      totalStudentLogins,
      totalRecruiterLogins,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, otp } = req.body;
    const user = await User.findById(req.id);

    if (!user || otp !== user.otp || new Date() > user.otpExpiry)
      return res.status(400).json({ message: "OTP failed", success: false });

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};
