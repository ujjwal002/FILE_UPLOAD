const { cloudinaryConnect } = require('../config/cloudinary');
const File = require('../models/File');
const cloudinary  = require("cloudinary").v2;
exports.localFileUpload = async(req,res)=>{
    try {
        // fetch file
        const file = req.files.file;
        console.log(file);
        let path = __dirname +"/files/"+Date.now()+`.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            console.log(err);
        })
        
        res.json({
            success:true,
            message:'Local File uploaded succesfully'
        })

        
    } catch (error) {
        console.log("Error in fileupload.js");
        console.log(error);
        
    }

}
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder}
    if(quality){
        options.quality = quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}


exports.imageUpload=async(req,res)=>{
    try {
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;

        console.log(file);

        // validation

        const supportTypes = ["jpg","jpeg","png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportTypes)){
            return res.status(200).json({
                success:false,
                message:"File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,"codehelp");
        console.log(response);

        // db me entry save karna hai

        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully in the database"
        })   
    } catch (error) {
        console.log(error);

        res.status(404).json({
            success:false,
            message:"Something went wrong in fileupload.js"
        })
        
    }
}
// video upload

exports.videoUpload = async (req, res) => {
  try {
    // data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.file.videoFiles;

    // validation

    const supportedTypes = ["mp4", "mov"];
    const fileTypes = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileTypes, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    // file format supported hai

    console.log("uploading to codehelp");

    const response = await uploadFileTocloudinary(file, "codehelp");
    console.log(response);

    // db me entry save karni

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "video uploades succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while uploading video",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    console.log(name, tags, email);

    const file = req.files.imageFiles;

    console.log(file);

    const supportFile = ["jpg", "jpeg", "png"];

    const fileTypes = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileTypes, supportFile)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    console.log("uploading to codehelp");

    const response = await uploadFileTocloudinary(file, "codehelp", 30);
    console.log(response);

    // db me entry save karni

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "false",
      message:
        "Error while doing size reduce in the code and go to controller folder to view the error",
    });
  }
};
    































