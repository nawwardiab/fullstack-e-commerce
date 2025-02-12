import createError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

const tokenizeCookie = async (user, res) => {
    const { JWT_SECRET, JWT_EXP } = process.env;
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    });
    res.cookie("jwtToken", token, { maxAge: 10 * 60 * 1000, httpOnly: true }); // to be modified when depolyment
  };
  
  export const register = async (req, res, next) => {
    try {
      const { fullName, email, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const cart = await Cart.create({});
  
      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        cartId: cart._id,
      });
  
      await tokenizeCookie(user, res);
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        throw createError(400, "Please provide email and password");
      }
  
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw createError(401, "Incorrect email or passsword");
      }
  
      await tokenizeCookie(user, res);
  
      res.status(201).json({
        success: true,
        message: "User logged successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const logout = async (req, res, next) => {
    try {
      res.clearCookie("jwtToken", { httpOnly: true }); // to be modified when depolyment
      res.status(200).json({
        success: true,
        message: "User was successfully logged out",
      });
    } catch (error) {
      next(error);
    }
  };