import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import {
  createNotification,
} from "../services/notificationService.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    // console.log("Registering user with data:", req.body);
    const { name, email, password, phone } = req.body;

    // check user
    const userExists = await User.findOne({ email });
    // console.log("userExists:", userExists);
    if (userExists) {
      return res.status(200).json({
        status: true,
        message: "This Email Already Exits . Please Login",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    await createNotification({
      title: "New User Registered",

      message: `${user.name} registered with ${user.email}`,

      category: "Customers",

      priority: "normal",

      relatedId: user._id,

      type: "NEW_USER",
    });
    // console.log("user:", user);
    res.status(200).json({
      status: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    // console.log("error:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        status: true,
        message: "This Email Does Not Exits . Please Register",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found"
      });
    }

    // TOKEN CREATE
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // RESET LINK
    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${token}`;

    // MAIL CONFIG
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // SEND MAIL
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Reset Password",

      html: `
        <h2>Password Reset</h2>

        <p>Click below link:</p>

        <a href="${resetLink}">
          Reset Password
        </a>
      `
    });

    res.status(200).send({
      success: true,
      message: "Reset link sent to email"
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong"
    });

  }

};

// RESET PASSWORD
export const resetPassword = async (req, res) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // FIND USER
    const user = await User.findById(
      decoded.id
    );

    if (!user) {

      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    return res.status(200).send({
      success: true,
      message:
        "Password reset successfully",
    });

  } catch (error) {

    return res.status(500).send({
      success: false,
      message:
        "Invalid or expired token",
    });

  }
};
