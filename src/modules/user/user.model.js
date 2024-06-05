const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const config = require("../../../config");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter Your Name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: false,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["super admin", "admin", "user"],
      default: "user",
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
