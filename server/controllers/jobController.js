import mongoose from "mongoose"
import Job from "../models/Job.js"
import { messageInRaw } from "svix";


//get all jobs
export const getJobs=async(req,res)=>{
 try{
    const jobs=await Job.find({visible:true})
    .populate({
     path:'companyId',select:'-password' });
     return res.status(200).json({
        success:true,
        jobs,
     })
 }
 catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
 }
}


//get a single job by id
export const getJobById=async(req,res)=>{
 try{
  const {id}=req.params;
  const job=await Job.findById(id).populate({
    path:"companyId",select:'-password'
  })

  if(!job){
    return res.json({
        success:false,
        message:"Job Not Found"
    })
  }
  return res.status(200).json({
    success:true,
    message:"Job fetched Successfully",
    job
  })
 }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
 }
}