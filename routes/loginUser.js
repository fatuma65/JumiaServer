const jwt = require('jsonwebtoken')
const User = require('../connect/models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config();



// logging the user in
const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body
        console.log(req.body)
        const existedUser = await User.findOne({where: {username}})

        if (!existedUser) {
            res.status(404).send('User doesnot exist')
        }
        const isPasswordValid = existedUser && await bcrypt.compare(password, existedUser.password)
        if (!isPasswordValid) {
            res.status(404).send('Incorrect password')
        }
        const token = jwt.sign(
            {
                id: existedUser.id,
                username: existedUser.username
            },
            process.env.SECRET_KEY,
            {expiresIn: '10min'}
        )
        res.status(200).send({token, username})
        await existedUser.save()
        console.log(`${username} you are now logged in`)
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
}
module.exports = {loginUser}