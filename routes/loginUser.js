const jwt = require("jsonwebtoken");
const User = require("../connect/models/userModel");
const {hashPassword} = require('../utilis/helpers')
require("dotenv").config();

// logging the user in
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const existedUser = await User.findOne({ where: { username} });
    const isPasswordValid = hashPassword(password, existedUser.password)


    if(!username || !password) {
      console.log('login has failed')
      return res.status(401),
      res.json({error: 'Invalid username or password'})
    }
    
    if (!existedUser) {
      res.status(404),
      res.json({error:"User doesnot exist"});
    }

    else if (!isPasswordValid) {
      // res.status(404),
      res.json({error: "Incorrect password"}),
      console.log('invalid password');
    }
    else {
    const UserId = existedUser.id
    const token = jwt.sign(
      {
        id: existedUser.id,
        username: existedUser.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10min" }
    );
    // res.statusCode(200);
    
    res.json({ token, username , UserId});
    res.status(200);
    }
    console.log(`${username} you are now logged in`);
  } catch (error) {
    console.log(error);
    // res.status(500),
    // res.json({ error: "internal server error" });
  }
};
module.exports = { loginUser };
