const validateRegistrationData = (req, res, next) => {
  console.log("Incoming request body:", req.body);
  console.log("Incoming files:", req.files);

  const {
    fullName,
    email,
    mobile,
    aadharNumber,
    panNumber,
    accountNumber,
    ifscCode,
    bankName,
    branchName,
    password,
    confirmPassword,
  } = req.body;
  const { panFront, aadharFront, aadharBack } = req.files || {};

  if (
    !fullName ||
    !email ||
    !mobile ||
    !aadharNumber ||
    !panNumber ||
    !accountNumber ||
    !ifscCode ||
    !bankName ||
    !branchName ||
    !password ||
    !confirmPassword
  ) {
    console.log("Validation failed: Missing required fields.");
    return res
      .status(400)
      .json({
        message:
          "All fields are required, including password and confirm password.",
      });
  } else {
    console.log("All required fields are present.");
  }

  if (password !== confirmPassword) {
    console.log("Validation failed: Passwords do not match.");
    return res
      .status(400)
      .json({ message: "Password and confirm password do not match." });
  } else {
    console.log("Passwords match.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Validation failed: Invalid email format.");
    return res.status(400).json({ message: "Invalid email format." });
  } else {
    console.log("Valid email format.");
  }

  if (mobile.length !== 10) {
    console.log("Validation failed: Invalid mobile number.");
    return res.status(400).json({ message: "Invalid mobile number." });
  } else {
    console.log("Valid mobile number.");
  }

  if (aadharNumber.length !== 12) {
    console.log("Validation failed: Invalid Aadhar number.");
    return res.status(400).json({ message: "Invalid Aadhar number." });
  } else {
    console.log("Valid Aadhar number.");
  }

  if (!panFront || panFront.length !== 1) {
    console.log("Validation failed: Missing or invalid PAN image.");
    return res
      .status(400)
      .json({ message: "You must upload exactly one PAN image." });
  } else {
    console.log("PAN image uploaded.");
  }

  if (
    !aadharFront ||
    !aadharBack ||
    aadharFront.length !== 1 ||
    aadharBack.length !== 1
  ) {
    console.log("Validation failed: Missing or invalid Aadhar images.");
    return res
      .status(400)
      .json({
        message: "You must upload exactly two Aadhar images (front and back).",
      });
  } else {
    console.log("Both Aadhar images uploaded.");
  }

  const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(ifscCode)) {
    console.log("Validation failed: Invalid IFSC code format.");
    return res.status(400).json({ message: "Invalid IFSC code format." });
  } else {
    console.log("Valid IFSC code format.");
  }

  // If all validations pass, proceed to next middleware
  console.log("All validations passed. Proceeding to next middleware.");
  next();
};

module.exports = { validateRegistrationData };
