const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  registerUser,
  loginUser,
  verifyOTP,
} = require("../controllers/authController.js");
const {
  validateRegistrationData,
} = require("../middleware/validationMiddleware.js");

const uploadsDir = path.resolve(
  "C:\\Users\\MY\\Desktop\\affiliate-authentication\\backend\\uploads"
);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (extName) return cb(null, true);
  cb("Error: Images Only!");
};

const uploadFiles = multer({ storage, fileFilter }).fields([
  { name: "aadharFront", maxCount: 1 },
  { name: "aadharBack", maxCount: 1 },
  { name: "panFront", maxCount: 1 },
]);
const router = express.Router();

router.post("/register", uploadFiles, validateRegistrationData, registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);

module.exports = router;
