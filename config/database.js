const mongoose = require('mongoose');

require("dotenv").config();


exports.connect =async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connectedd");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to datbase");
    }
}