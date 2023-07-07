
// app create
const express = require('express');
const app = express();

// port find karna
require("dotenv").config();
const PORT = process.env.PORT|| 5000;

// add middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// db connection
require('./config/database').connect();

// clod connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// app routes 
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);

app.get('/',(req,res)=>{
    res.send("hii this is ujjwal kumar")
})
// server started
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})