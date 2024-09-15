import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {User } from '../models/user.model.js'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req,res)=> {
  //1.  get user details from postman or frontend
  //2.  validation - not empty
  //3.  check if alraedy exits:uername,email
  //4.  check all images and check avatar
  //5.  upload in cloudinary,avatar
  //6.  create user object-create entry in db
  //7.  remove password and refresh token from response
  //8.  check for user creation
  //9.  return response

  const {userName ,email ,password ,fullName}= req.body
  console.log("email",email);
  
//   if (fullName === ""){
//    throw new ApiError(400, "fullName is required")

//   }
  if ([fullName,email,username,password].some( (field) => field?.trim() === "")) {
   throw new ApiError(400,"All Fields are required")
  }
  
let check = email.includes("@");
console.log(check);
if(!check){
   throw new ApiError(400 , "Email must be in correct format")
}

 const existedUser = User.findOne({
   $or:[{ username },{ email }]
})
if(existedUser){
   throw new ApiError(409, "User with this email already exists")
}
const avatarLocalPath=req.files?.avatar[0].path ;
const coverImageLocalPath=req.files?.coverImage[0].path ;

if(!avatarLocalPath){
  throw new ApiError(400,"Avatar not found")
}

   const avatar= await uploadOnCloudinary(avatarLocalPath);
   const coverImage= await uploadOnCloudinary(coverImageLocalPath);


  if(!avatar){
    throw new ApiError(400,"Avatar not found")
  }

  User.create({
    fullName,
    email,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    password,
    userName:userName.toLowerCase()
  })


  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
  }

 return res.status(201).json(
  new ApiResponse(200,createdUser,"user registered successfully")
 )
})

export { registerUser,}
