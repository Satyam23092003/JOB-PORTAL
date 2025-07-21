// import { Webhook } from "svix";

// import User from "../models/User.js";

// //API controller function to manage clerk User with database

//  export const clerkWebhooks= async(req,res)=>{
//     try{
//        // Create a svix instance with clerk webhooks secret
//       const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

       
//        // verifying headers
//          await whook.verify(JSON.stringify(req.body),{
//             "svix-id":req.headers["svix-id"],
//             "svix-timestamp":req.headers["svix-timestamp"],
//             "svix-signature":req.headers["svix-signature"]
//        })

//        //Getting the data from the request body
//            const {data,type}=req.body;

//        //switch case for different event
//        switch(type){
//          case 'user.created':{
//           const userData={
//             _id:data.id,
//             email: data.email_addresses[0].email_address,
//             name: data.first_name+" "+ data.last_name,
//             image:data.image_url,
//             resume:''
//           }
//           await User.create(userData);
//           res.json({})
//           break;
//          }
//          case 'user.updated':{
//             const userData={
//                email:data.email_addresses[0].email_address,
//                name:data.first_name+" "+data.last_name,
//                image:data.image_url,
//              }
//              await User.findByIdAndUpdate(data.id,userData);
//              res.json({})
//              break;
//          }
//          case 'user.deleted':{
//               await User.findByIdAndDelete(data.id)
//               res.json({})
//               break;
//          }
//          default:
//           break;
//        }

//     }
//     catch(error){
//        console.log(error.message);
//        res.json({
//          success:false,
//          message:"Webhooks Error"
//        })
//     }
// }



// import { Webhook } from "svix";
// import User from "../models/User.js";
// // API Controller Function to Manage Clerk User with Database
// export const clerkWebhooks = async(req,res) => {
//     try {
//         // Create a Svix instance with clerk webhook secret
//         const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)
//         // Verifying Headers
//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         });
        
//         // Getting Data from request body
//         const { data, type } = req.body
//         // Switch case for diffrent event
//         switch (type) {
//             case 'user.created':{
//                 const userData = {
//                     _id:data.id, 
//                     email:data.email_addresses[0].email_address,
//                     name:data.first_name + " " + data.last_name,
//                     image:data.image_url,
//                     resume:'' 
//                 }
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.updated':{
//                 const userData = {
//                     email:data.email_addresses[0].email_address,
//                     name:data.first_name + " " + data.last_name,
//                     image:data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id,userData) 
//                 res.json({})
//                 break;
//             }
//             case 'user.deleted':{
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }   
//             default:
//                 break;
//         }
        
//     } catch (error) {
//         console.log(error.message)
//         res.json({success:false,message:'Webhooks Error'})
//     }
// }


// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkWebhooks = async(req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     const evt = whook.verify(
//       JSON.stringify(req.body),
//       {
//         "svix-id": req.headers["svix-id"],
//         "svix-timestamp": req.headers["svix-timestamp"],
//         "svix-signature": req.headers["svix-signature"],
//       }
//     );

//     const { data, type } = evt;
//     console.log("Received webhook:", type);

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses?.[0]?.email_address,
//           name: `${data.first_name} ${data.last_name}`,
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         return res.status(200).json({});
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses?.[0]?.email_address,
//           name: `${data.first_name} ${data.last_name}`,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         return res.status(200).json({});
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         return res.status(200).json({});
//       }

//       default:
//         return res.status(200).json({ message: "Unhandled event" });
//     }
//   } catch (error) {
//     console.error("Webhook error:", error.message);
//     return res.status(400).json({ success: false, message: "Webhook Error" });
//   }
// };


// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const evt = whook.verify(req.body, {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     const { data, type } = evt;
//     console.log("📩 Webhook Event:", type);

//     switch (type) {
//       case "user.created": {
//         console.log("👤 User Created:", data.id);
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses?.[0]?.email_address,
//           name: `${data.first_name} ${data.last_name}`,
//           image: data.image_url,
//           resume: "",
//         };

//         try {
//           await User.create(userData);
//           console.log("✅ User created in DB:", userData);
//         } catch (err) {
//           console.error("❌ Error creating user:", err.message);
//           if (err.code === 11000) {
//             console.error("⚠️ Duplicate email:", userData.email);
//           }
//         }

//         return res.status(200).json({});
//       }

//       case "user.updated": {
//         //  console.log("👤 User Created:", data.id);
//         const userData = {
//           email: data.email_addresses?.[0]?.email_address,
//           name: `${data.first_name} ${data.last_name}`,
//           image: data.image_url,
//         };

//         await User.findByIdAndUpdate(data.id, userData, { new: true });
//         console.log("🔄 User updated:", data.id);
//         return res.status(200).json({});
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         console.log("🗑️ User deleted:", data.id);
//         return res.status(200).json({});
//       }

//       default:
//         console.log("⚠️ Unhandled event type:", type);
//         return res.status(200).json({ message: "Unhandled event" });
//     }
//   } catch (error) {
//     console.error("❌ Webhook verification failed:", error.message);
//     return res.status(400).json({ success: false, message: "Webhook Error" });
//   }
// };


import { Webhook } from "svix";
import User from "../models/User.js";
// API Controller Function to Manage Clerk User with Database
export const clerkWebhooks = async(req,res) => {
    try {
      console.log("Received webhook request");
        // Create a Svix instance with clerk webhook secret
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)
        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        
        // Getting Data from request body
        const { data, type } = req.body
        // Switch case for diffrent event
        switch (type) {
            case 'user.created':{
                const userData = {
                    _id:data.id, 
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                    resume:'' 
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData = {
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userData) 
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                console.log("User deleted:", data.id);
                res.json({})
                break;
            }   
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:'Webhooks Error'})
    }
}