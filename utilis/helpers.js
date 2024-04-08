const bcrypt = require("bcrypt");

const hashPassword = async (raw, hash) => {
    return await bcrypt.compare(raw, hash)
}

const hashed = (password) => {
    const salt =  bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}
module.exports = {
    hashPassword,
    hashed
}