import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import orderRoutes from "./routes/orderRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import addressRoutes from "./routes/addressRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import dashboardRoutes
  from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import pincodeRoutes from "./routes/pincodeRoutes.js";
import path from "path";


dotenv.config();

const app = express();

// DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());


app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight requests handle karo
app.options("*", cors());

// app.use("/uploads", express.static("uploads"));

app.use("/uploads",express.static(path.join(process.cwd(), "uploads")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/pincode", pincodeRoutes);

app.use(
  "/api/location",
  locationRoutes
);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});




