const bcrypt = require("bcrypt");


const hashPassword =  (password, salt) => {
    return bcrypt.hashSync(password, salt)
};

module.exports = hashPassword;