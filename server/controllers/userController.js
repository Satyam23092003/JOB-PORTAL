import { messageInRaw } from "svix";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import {v2 as cloudinary} from "cloudinary"
import Job from "../models/Job.js";

// Get User Data
export const getUserData=async(req,res)=>{
    console.log(req.auth);
    const userId=req.auth.userId;
    try{
       const user=await User.findById(userId);
       if(!user){
        return res.status(400).json({
            success:false,
            message:"User is Not Found"
        })
       }

       return res.status(200).json({
        success:true,
        message:"User Data Fetched Successfully",
        user,
    
       })
    }catch(error){
        return res.status(500).json({
        success:false,
        message:error.message,
    
       })
    }
}

// Apply for a job
export const applyForJob=async(req,res)=>{
   const {jobId}=req.body;
   const userId=req.auth.userId;
//    console.log("Hello")
//    console.log(userId);
   try{
    const isAlreadyApplied=await JobApplication.find({jobId,userId});
    if(isAlreadyApplied.length>0){
        return res.status(403).json({
            success:false,
            message:"Already applied"
        })
    }

    const jobData=await Job.findById(jobId);
    if(!jobData){
        return res.status(404).json({
            success:false,
            message:"Job Not Found"
        })
    }

    await JobApplication.create({
        userId,
        companyId:jobData.companyId,
        jobId,
        date:Date.now(),
    })

    return res.status(200).json({
        success:true,
        message:"Applied Successfully"
    })
   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

// Get user applied applications
export const getUserJobApplications=async(req,res)=>{
   try{
    const userId=req.auth.userId;
    const applications=await JobApplication.find({userId})
    .populate('companyId','name email image')
    .populate('jobId','title description location category level salary')
    .exec();



    if(!applications){
        return res.status(404).json({
            success:false,
            message:"No Job application found for this user"                 
        })
    }

    return res.status(200).json({
        success:true,
        message:"Job Application Fetched successfully",
        applications
    })
   }catch(error){
   return res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

// Update user profile (resume)
export const updateUserResume=async(req,res)=>{
  try{
    // console.log("Hello Debugging");
    // console.log(req.auth);
  const userId=req.auth.userId;
  const resumeFile=req.file;
  const userData=await User.findById(userId);
  
  if(resumeFile){
    const resumeUpload=await cloudinary.uploader.upload(resumeFile.path);
    userData.resume=resumeUpload.secure_url
  }

  await userData.save();

  return res.status(200).json({
    success:true,
    message:"Resume Updated Successfully"
  })



  }catch(error){
   return res.status(500).json({
    success:false,
    message:error.message
  })
  }
}