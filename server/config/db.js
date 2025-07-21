import mongoose from 'mongoose'

//function to connect to the mongodb database
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
      }
    
}

export default connectDB