const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (data) => {

    const { name, email, password, phone } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone
    });

    const token = generateToken(user);

    return {
        user,
        token
    };
};

exports.loginUser = async (data) => {

    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid Email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    if (user.isBlocked) {
        throw new Error("User Blocked");
    }

    const token = generateToken(user);

    return {
        user,
        token
    };
};