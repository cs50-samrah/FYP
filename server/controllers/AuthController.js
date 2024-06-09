const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const requiredFields = ["email", "firstName", "lastName", "password", "confirmPassword"];

    // Check if all required fields are present in the request body
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      res.json({
        message: "Data required: " + missingFields.join(", "),
        status: false,
      });
      return;
    }
    const isExists = await User.findOne({
      email: req.body.email,
    });
    if (isExists) {
      res.json({
        message: "User Already Exists",
        status: false,
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      res.json({
        message: "Invalid Email Address",
        status: false,
      });
      return;
    }
    // const phoneRegex = /^0\d{10}$/;
    // if (!phoneRegex.test(req.body.phoneNumber)) {
    //   res.json({
    //     message: "Invalid Phone Number",
    //     status: false,
    //   });
    //   return;
    // }
    const nameRegex = /^[A-Za-z]+$/;
    if (
      !nameRegex.test(req.body.firstName) ||
      !nameRegex.test(req.body.lastName)
    ) {
      res.json({
        message: "Invalid First Name or Last Name",
        status: false,
      });
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
    if (
      !passwordRegex.test(req.body.password) ||
      !passwordRegex.test(req.body.confirmPassword)
    ) {
      res.json({
        message:
          "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
        status: false,
      });
      return;
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const hashConfirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);
    // Actually registering user
    const user = await User.create({
      ...req.body,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
    });
    const token = jwt.sign({ id: user._id }, "mypassword", {
      expiresIn: "30d",
    });
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 2592000000
    })
    res.json({
      user,
      token,
      message: "User Registed Successfully",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};

exports.login = async (req, res) => {

  try {
    let arr = ["email", "password"];

    let remainingFields = arr.filter(value => !req.body[value]);
    if (remainingFields.length > 0) {
      res.json({
        message: "Data required: " + remainingFields.join(", "),
        status: false,
      });
      return;
    }

    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.json({
        message: "User Doesn't exists",
        status: false,
      });
      return;
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
      res.json({
        message: "Wrong Password!!",
        status: false,
      });
      return;
    }
    const token = await jwt.sign({ id: user.id }, "mypassword", {
      expiresIn: "30d",
    });
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 2592000000
    })
    res.json({
      token,
      user,
      message: "Successfully logged in",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false
    })
  }
};

