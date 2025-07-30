import upload from "../config/multer.js";
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from "../controllers/userController.js";
import express from "express";
const router=express.Router();

// Get User Data
router.get('/user',getUserData);

// Apply for a job
router.post('/apply',applyForJob);

// Get applied jobs data
router.get('/applications',getUserJobApplications);


// Update user profile
router.post("/update-resume",upload.single('resume'),updateUserResume);


export default router;
