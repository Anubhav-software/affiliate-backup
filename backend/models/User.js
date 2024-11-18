const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-z\s]{1,30}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid full name. It must be letters and spaces, with a maximum length of 30 characters.`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    panImages: [
      {
        type: String,
        required: true,
      },
    ],
    aadharNumber: {
      type: String,
      required: true,
    },
    aadharImages: [
      {
        type: String,
        required: true,
      },
    ],
    panNumber: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
      match: /^[A-Za-z]{4}0[A-Z0-9]{6}$/,
    },
    bankName: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    otp: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
