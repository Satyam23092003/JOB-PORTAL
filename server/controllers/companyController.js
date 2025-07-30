// Register a new company
import Company from "../models/Company.js";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import { messageInRaw } from "svix";
import Job from "../models/Job.js"
import JobApplication from "../models/jobApplication.js";

export const registerCompany = async (req, res) => {
    const{name, email, password} = req.body;
    const imageFile=req.file;


    if(!name || !email || !password ||!imageFile) {
        return res.status(400).json({ 
            success:false,
            message: "All fields are required"
         });
    }
   const salt=await bcrypt.genSalt(10)
   const hashPassword=await bcrypt.hash(password,salt);

    try{
        const companyExists=await Company.findOne({email})
        if(companyExists){
            return res.json({
                success:false,
                message:"Company is already registered"
            })
        }
        const imageUpload=await cloudinary.uploader.upload(imageFile.path);

        const company=await Company.create({
             name,
             email,
             password:hashPassword,
             image:imageUpload.secure_url
        })
         return res.status(200).json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generateToken(company._id)
            
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

// Company Login 
export const loginCompany = async (req, res) => {
      const {email,password}=req.body;
      try{
      if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

        const company=await Company.findOne({email})
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Firstly Yoh have to registered"
            })
        }

        if(await bcrypt.compare(password,company.password)){
            return res.status(200).json({
                success:true,
                company:{
                    _id:company.id,
                    email:company.email,
                    name:company.name,
                    image:company.image,
                },
                message:"Login Successfully",
                token:generateToken(company._id)
            });
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
            });
        }
      
      }catch(error){
           return res.status(500).json({
            success:false,
            message:error.message
        })
      }
}

//get all company data
export const getCompanyData=async (req,res) => {  
    try{
     const company=req.company;
     return res.status(200).json({
        success:true,
        company
     })
     }catch(error){
     return  res.status(500).json({
        success:false,
        message:error.message
      })
     }
}



// Post a new Job
export const postJob= async(req,res)=>{
    
    const {title,salary,description,location,level,category}=req.body;
    if(!title || !salary || !category|| !description || !location ||!level){
        return res.status(404).json({
            success:false,
            message:"All fields are required"
        })
    }


    const companyId=req.company._id
    // console.log(companyId,{title,salary,description,location});

    try{
    const newJob= new Job({
        title,
        description,
        location,
        salary,
        companyId,
        date:Date.now(),
        level,
        category,
    })
    await newJob.save();
    return res.status(200).json({
        success:true,
        message:"Job Posted Successfully",
        newJob

    })
    }catch(error){
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }

}

//get company job applicant
export const getCompanyJobApplicants=async(req,res)=>{
     try{
     const {companyId}=req.company._id;
     //Find the job application for this company
     const applications=await JobApplication.find(companyId)
     .populate('userId','name image resume')
     .populate('jobId',' title category location level salary')
     .exec();
  

    

     return res.status(200).json({
        success:true,
        applications,
     })
     }catch(error){
      return res.status(500).json({
        success:false,
        message:error.message
     })
     }
}


//Get company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try{
      const companyId=req.company._id;
      const jobs=await Job.find({companyId})

    //Adding no of applicants in the data

    const jobsData=await Promise.all(jobs.map(async(job)=>{
        const applicants=await JobApplication.find({jobId:job._id});
        return {...job.toObject(),applicants:applicants.length}
    }))
      
      return res.status(200).json({
        success:true,
        jobsData,
        message:"Job fetched Successfully",
      })
    }  catch(error){
       return  res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Change Job Applicantion Status
export const changeJobApplicationStatus = async (req, res) => {
    try{

        const {id,status}=req.body;
        // find job application status and update status

        await JobApplication.findOneAndUpdate({_id:id},{status});

        return res.status(200).json({
            success:true,
            message:"Status Changed"
        })


    } catch(error){
       return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//change job Visibility
export const changeVisibility = async (req, res) => { 
    try{
     const {id}=req.body;

     const companyId=req.company._id;
     const job=await Job.findById(id)
     if(!job){
        return res.status(402).json({
            success:false,
            message:"Job Not Found"
        })
     }
     console.log(companyId);
     console.log(job.companyId);
     if(companyId.toString() === job.companyId.toString()){
        job.visible=!job.visible
     }

     await job.save();
     return res.status(200).json({
        success:true,
        job
     })
    }catch(error){
     res.json({
        success:false,
        message:error.message
     })
    }    
}


