const User = require("../models/auth-model");
const bcrypt = require("bcryptjs");

function errorHandlerRegister({name, email, password}) {
  let errors = [];

  if (!name) errors.push({ message: "Name is required." });
  if (!email) errors.push({ message: "Email is required." });
  if (!password) errors.push({ message: "Password is required." });

  return errors;
}

// clean code
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = errorHandlerRegister({ name, email, password });
  if(errors.length > 0) return res.status(400).json({errors});

   try {
      const emailExists = await User.findUserByEmail(email);

      if (emailExists) return res.status(400).json({ message: "Email already registered" });

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

const login = async (req, res) => {
  const { name, email, password } = req.body;
  
   const errors = errorHandlerRegister({ name, email, password });
   if (errors.length > 0) return res.status(400).json({ errors });
  
   try {
     const user = await User.findUserByEmail(email);
     const nameUser = await User.findUserByName(name);

     if (!user) return res.status(404).json({ message: "EMAIL NOT FOUND!" });
     if (!nameUser) return res.status(404).json({ message: "NAME NOT FOUND!" });

      const CorrectPass = await bcrypt.compare(password, user.password);

      if (CorrectPass) return res.status(200).json({ message: `WELCOME ${user.name}!` });
      else  return res.status(401).json({ message: "INCORRECT PASSWORD!" });
      
   } catch (error) {
      console.error(error);
   }
};

module.exports = {
   register,
   login,
};
