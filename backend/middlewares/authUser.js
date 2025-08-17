// middleware/authUser.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id };
    // ✅ store in req.user

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;
