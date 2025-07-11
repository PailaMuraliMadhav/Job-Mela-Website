import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Uni } from "../models/uni.js";

import nodemailer from "nodemailer";

// OTP Generation Function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail", // Or your email provider
  auth: {
    user: process.env.EMAIL_USER, // Add your email here
    pass: process.env.EMAIL_PASS, // Add your email password or app-specific password
  },
});

// Function to send OTP
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Two-Factor Authentication",
    text: `Your OTP is: ${otp}. Please use it to complete your login.`,
  };

  await transporter.sendMail(mailOptions);
};

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Check if required fields are present
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const file = req.file; // This will contain the uploaded file

    // Check if file is provided
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    // Convert file to Data URI
    const fileUri = getDataUri(file);

    // Upload the file to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and store OTP and expiry
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: "registered successfully ",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Login request body

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check if the role matches
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the current role.",
        success: false,
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP expires in 5 minutes

    // Send OTP to email
    await sendOTP(user.email, otp);

    // Store OTP and expiry in the database
    user.otp = otp;
    user.otpExpiry = otpExpiry;


    //login track
    user.trackLogin();

    await user.save();

    return res.status(200).json({
      message: "OTP sent to your email. Please verify.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if the email and OTP are provided
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        success: false,
      });
    }

    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if OTP has expired
    const currentTime = new Date();
    if (currentTime > new Date(user.otpExpiry)) {
      return res.status(400).json({
        message: "OTP has expired",
        success: false,
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    // OTP is correct and not expired, so proceed with verifying the user
    user.otp = null; // Clear OTP after successful verification
    user.otpExpiry = null; // Clear OTP expiry
    await user.save();

    console.log("yo");

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // console.log(token);
    // console.log(user);

    

    const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      }

      const users = await User.find({});

    let totalActiveUsers = 0;
    let totalStudentLogins = 0;
    let totalRecruiterLogins = 0;

    // Traverse through all users
    users.forEach(user => {
      // Increment total active users count if student or recruiter has logged in
      if (user.studentLogin) totalStudentLogins++;
      if (user.recruiterLogin) totalRecruiterLogins++;

      // Consider user as active if either student or recruiter has logged in in the last 30 days
      if (user.studentLogin || user.recruiterLogin) totalActiveUsers++;
    });

    res.status(200).cookie("token", token, options).json({
        message: `Welcome back ${user.fullname}`,
        user,
        totalActiveUsers,
        totalStudentLogins,
        totalRecruiterLogins,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, otp } = req.body; // Including OTP

    // Verify OTP before allowing profile update
    let user = await User.findById(req.id);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
        success: false,
      });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({
        message: "OTP has expired.",
        success: false,
      });
    }

    const file = req.file;
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // Update user data after OTP verification
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

