const bcrypt = require("bcrypt");
const Admin = require("../connect/models/Admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      role,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !phoneNumber
    ) {
      console.log("Registration has failed");
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      role,
      password: hashedPassword,
    });
    res.status(200).send({ newAdmin: newAdmin });
    console.log("Admin created successsfully");
  } catch (error) {
    res.status(500).send({ error: "Internal Server error" });
    console.log(error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log("Invalid credentials");
    }

    const existingUser = await Admin.findOne({ where: { username } });
    // console.log(existingUser);

    if (!existingUser) {
      console.log("Admin doesnot exist");
      res.status(400).send({ error: "Admin does not exist" });
    }
    console.log(existingUser.password);
    console.log(password);

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      console.log("Password is not valid");
      res.status(401).send({ error: "Password is not valid" });
    }

    const adminId = existingUser.id;
    const token = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10min" }
    );

    res.status(200).json({ token, adminId, username });
    await existingUser.save();
    console.log(`${username} you are now logged in`);
  } catch (error) {
    res.status(500).send({ error: "Internal Server error" });
    console.log(error);
  }
};

module.exports = { createAdmin, loginAdmin };
