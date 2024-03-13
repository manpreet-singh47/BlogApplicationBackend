const express = require("express");
const UserModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signup = async (req, res) => {
  const { fullname, username, password } = req.body;

  try {
    const userNameExist = await UserModel.findOne({ username: username });

    if (userNameExist) {
      return res.status(400).json({ error: "Username already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      fullname,
      username,
      password: hashedPassword,
    });
    console.log(user);

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(201).json({ success: "User registerd", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const Login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invaild Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
    });

    return res.status(201).json({ success: "Login Successful", user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 } && res.send("Logout success"));
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { Signup, Login, Logout };
