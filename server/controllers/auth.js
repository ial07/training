import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // console.log('REGISTER ENDPOINT => ', req.body)
  const { name, email, password, secret } = req.body;

  //validation
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!email) {
    return res.json({
      error: "Email is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required, and should be 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Answer is required",
    });
  }
  //Looking for same email
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }
  //hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword, secret });
  try {
    await user.save();
    console.log("REGISTERED USER => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("Register Failed => ", err);
    return res.status(400).send("Error, Try Again..");
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    /// check apakah ada data user di database
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password, try Again!",
      });
    }
    // create sign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again!");
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // res.json(user)
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
};

export const forgotPassword = async (req, res) => {
  // console.log(req.body)
  const { email, newPassword, secret } = req.body;
  //validation
  if (!newPassword || newPassword < 6) {
    return res.json({
      error: "New password is required and should be min 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is Required",
    });
  }
  const user = await User.findOne({ email, secret });
  if (!user) {
    res.json({
      error: "Reset password failed, please enter the right value.",
    });
  }

  const hashed = await hashPassword(newPassword);
  try {
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats, Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something wrong, please try again");
  }
};
