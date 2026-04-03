const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      requires: true,
      ref: "User "
    },
    name: {
      type: String,
      requires: [true, "please enter the name"],
    },
    email: {
      type: String,
      requires: [true, "please enter the email"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      requires: [true, "please enter the password"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
