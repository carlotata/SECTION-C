const User = require("../models/auth-model");
const bcrypt = require("bcryptjs");

// clean code
const register = async (req, res) => {
  const { name, email, password } = req.body;

  let errors = [];

  if (!name) errors.push[{ field: name, message: "Name is required." }];
  if (!email) errors.push[{ field: email, message: "Email is required." }];
  if (!password)
    errors.push[{ field: password, message: "Password is required." }];

  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const emailExists = await User.findUserByEmail(email);

    if (emailExists)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await User.createUser(name, email, hashedPassword);
    } catch (error) {
      console.error(error);
    }

    res.status(201).json({ message: "User has been created." });
  } catch (error) {
    console.error(error);
  }
};

const login = async () => {};

module.exports = {
  register,
  login,
};
