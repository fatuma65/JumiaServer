const bcrypt = require("bcrypt");
const User = require("../connect/models/userModel");

// Creating a new User
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    console.log(newUser);
    res.status(200).send({ message: "User created successfully" });
    await newUser.save();
  } catch (error) {
    console.log("An error has occured", error);
    res.status(500).send({ error: "Internal Server error" });
  }
};

// getting users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ users: users });
  } catch (error) {
    console.log("An error has occured", error);
    res.status(500).send({ error: "Internal Server error" });
  }
};

// getting one user
const getUser = async (req, res) => {
  try {
    const userRequest = req.params.id;
    const user = await User.findByPk(userRequest);
    // user ? user : res.status(404).json({error: 'user not found'})
    if (!user) {
      return res.status(404).send("User is not found");
    }
    res.status(200).send({ user });
  } catch (error) {
    console.log("An error has occured", error);
    res.status(500).send({ error: "Internal Server error" });
  }
};

// update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateAttributes = req.body;

    if (updateAttributes.password) {
      const hashedPassword = await bcrypt.hash(updateAttributes.password, 10);
      updateAttributes.password = hashedPassword;
    }
    const [rowsUpdated] = await User.update(updateAttributes, {
      where: { id: userId },
    });
    if (rowsUpdated > 0) {
      return res.json(updateAttributes);
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.log("An error has occured", error);
    res.status(500).send({ error: "Internal Server error" });
  }
};

// delete a User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user) {
      user.destroy();
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(400).send(console.log("an error has occured"));
    }
  } catch (error) {
    console.log("An error has occured", error);
    res.status(500).send({ error: "Internal Server error" });
  }
};
module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
