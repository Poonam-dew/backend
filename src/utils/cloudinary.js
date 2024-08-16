import {v2 } from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUDNARY_CLOUD_NAME,
    api_key:CLOUDNARY_CLOUD_APIKEY,
    api_secret:CLOUDNARY_CLOUD_API_SECRET
});
const uploadOnCloudinary=async (localFilePath) => {
   try {
    if(!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath,{
        resorce_type:"auto"
    })
    console.log("file uploaded",response.url)
    return response;
 
} catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
   }
}
export {uploadOnCloudinary}
