// middleware/authUser.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers; // token from Postman or frontend
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ store in req.user

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;
