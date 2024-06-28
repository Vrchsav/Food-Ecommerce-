
const cloudinary=require('cloudinary').v2;


async function uploadFileToCloudinary(file,folder,quality) {
    const options = {folder}
    options.resource_type = "auto";
    if(quality){
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}



module.exports= uploadFileToCloudinary;