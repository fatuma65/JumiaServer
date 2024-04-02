const bcrypt = require("bcrypt");
const User = require("../connect/models/userModel");
const {hashed} = require('../utilis/helpers');
const { where } = require("sequelize");

// Creating a new User
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    console.log(req.body);

    if (!firstName || !lastName || !email || !username || !password) {
      console.log('Registration has failed')
      return res.status(401),
      res.json({error: 'Invalid credentials'})

    }

    const hashedPassword1 = hashed(password);
    console.log(hashedPassword1)

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword1,
    });
    // console.log(newUser);
    res.status(200),
    res.json({ message: "User created successfully" });
    await newUser.save();
  } catch (error) {
    // console.log("An error has occured", error);
    res.status(500),
    res.json({ error: "Internal Server error" });
  }
};

// getting users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users)
    res.status(200),
    res.json(users);
  } catch (error) {
    console.log("An error has occured getting users", error);
    res.status(500).send({ error: "Internal Server error" });
  }
};

// getting one user
const getUser = async (req, res) => {
  try {

  const userId = req.params.id;
  const userI = parseInt(userId, 10)
  console.log(userI)

  if ( userI === undefined) {
    res.json({error1: 'User id is not defined'})
    console.log("user Id is undefined")
  }
   
    const userRequest = await User.findByPk(userI);

    if (!userRequest) {
      res.status(404),
      console.log('user is not found')
      res.json({error:"User is not found"})
    }
    else {
    res.status(200),
    res.json(userRequest);
    }
  } catch (error) {
    res.status(500),
    res.json({ error: "Internal Server error" })
    console.log("An error has occured getting the user")
  }
};

// update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userI = parseInt(userId, 10)
    console.log(userI)
    if (userI === undefined) {
      console.log('user is undefined')

    }
    const updateAttributes = req.body;

    if (!updateAttributes) {
      res.status(401),
      res.send("Theres nothing to change");
    } 
    // const user = await User.findByPk(userId)
    
    if (updateAttributes.password) {
      const hashedPassword = hashed(updateAttributes.password);
      updateAttributes.password = hashedPassword;
    }
    const user = await User.update(updateAttributes, {where: {id: userI}} )

    if(!user) {
      res.status(404),
      res.json({error: 'User not found'}),
      console.log('user not found')

    }

    // await User.update(updateAttributes)
    res.status(200),
    res.json({message: "user has been updated"})
    console.log('user has been changed')
    // await user.save()
  } catch (error) {
    console.log("An error has occured updating the user", error);
    res.status(500)
    // res.json({ error: "Internal Server error" });
  }
};

// delete a User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const userI = parseInt(userId, 10)

    if (userId === undefined) {
      console.log('user is undefined')

    }

    const user = await User.destroy({where: {id: userI}})
   
    if (!user) {
      res.status(404),
      res.json({error: 'User not found'})
    }
    res.status(200),
    res.json({ message: "User deleted successfully" })
    console.log('user deleted successfully')
  } catch (error) {
    console.log("An error has occured deleting the user", error);
    res.status(500)
    res.json({ error: "Internal Server error" })
  }
};

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
