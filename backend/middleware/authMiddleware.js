import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {

    const token =
      req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        status: "error",
        message: "Token Missing",
      });

    }

    const actualToken =
      token.split(" ")[1];

    const decoded = jwt.verify(
      actualToken,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(decoded.id);

    if (!user) {

      return res.status(401).json({
        status: "error",
        message: "Invalid Token",
      });

    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });

  }
};


// export const protect = async (
//   req,
//   res,
//   next
// ) => {
//   try {

//     const token =
//       req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = await User.findById(decoded.id);

//     next();

//   } catch (error) {

//     return res.status(401).json({
//       success: false,
//       message: "Token failed",
//     });

//   }
// };

export const adminOnly = (
  req,
  res,
  next
) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      success: false,
      message: "Admin only",
    });

  }

  next();
};



export const protect = async (req, res, next) => {

  try {

    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "No token",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }

};
export default authMiddleware;