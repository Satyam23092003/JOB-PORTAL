import { getJobById, getJobs } from "../controllers/jobController.js";
import express from "express";
const router=express.Router();


//Route to get all jobs data
router.get('/',getJobs);


//Route to get a single job by id
router.get('/:id',getJobById)




export default router;
