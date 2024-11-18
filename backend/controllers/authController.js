const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User.js");
const crypto = require("crypto");

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP for login is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

const registerUser = async (req, res) => {
  const {
    fullName,
    email,
    mobile,
    password,
    confirmPassword,
    aadharNumber,
    panNumber,
    accountNumber,
    ifscCode,
    bankName,
    branchName,
  } = req.body;
  const panImage = req.files.panFront[0].filename;
  const aadharImages = [
    req.files.aadharFront[0].filename,
    req.files.aadharBack[0].filename,
  ];

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirm password do not match." });
  }

  //already existing user

  const hashedPassword = await bcrypt.hash(password, 15);

  const user = new User({
    fullName,
    email,
    mobile,
    password: hashedPassword,
    panImages: [panImage],
    panNumber,
    aadharNumber,
    aadharImages,
    accountNumber,
    ifscCode,
    bankName,
    branchName,
  });

  try {
    await user.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 3600000,
    });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User cannot be Registered , Please try again", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt received with email:", email);
  console.log("Password:", password);
  //message more clear
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password." });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  await user.save();

  await sendOTP(email, otp);

  res.status(200).json({ message: "OTP sent to email." });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  console.log("Received request to verify OTP:", { email, otp });

  const user = await User.findOne({ email });

  console.log("User found in DB:", user);

  if (!user) {
    console.log("No user found with this email");
    return res.status(400).json({ message: "User not found." });
  }

  console.log("Stored OTP in DB:", user.otp);

  if (user.otp !== otp) {
    console.log("OTP mismatch: expected", user.otp, "but got", otp);
    return res.status(400).json({ message: "Invalid OTP." });
  }

  user.otp = null;
  await user.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 3600000,
  });

  console.log("OTP successfully verified, login successful.");

  res.status(200).json({ message: "Login successful", token });
};

module.exports = { registerUser, loginUser, verifyOTP };
