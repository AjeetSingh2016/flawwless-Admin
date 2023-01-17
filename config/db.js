const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set("strictQuery", false);

module.exports = connect = async () =>{
    try {
        const response = await mongoose.connect(process.env.URL)
        console.log("Connection established");
    } catch (error) {
        console.log("error");
    }
}