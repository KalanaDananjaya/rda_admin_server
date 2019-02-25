const dotenv = require ('dotenv').config();

module.exports = {
    port : process.env.PORT,
    dbConnString : process.env.dbURI,
    secret : process.env.SECRET
};