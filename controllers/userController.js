const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill in all the fields");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered ");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.json({ name: user.name, email: user.email });
});
//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("the use does not found");
  }
  const checkingPassword = await bcrypt.compare(password, user.password);
  if (checkingPassword) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      },
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("the password  password is not valid");
  }
});
//@desc current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  console.log("current user");
  res.json({ message: "current user" });
});

module.exports = { registerUser, loginUser, currentUser };
