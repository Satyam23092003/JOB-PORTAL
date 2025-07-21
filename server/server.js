  import "./config/instrument.js";
  import express from "express";
  import cors from "cors";
  import "dotenv/config";
  import connectDB from "./config/db.js";
  
  import * as Sentry from "@sentry/node";
  import {clerkWebhooks} from "./controllers/webhooks.js";
  import {clerkMiddleware} from '@clerk/express'

  const app = express();
  await connectDB();
  //middlewares
  app.use(cors());
  app.use(express.json());
  app.use(clerkMiddleware())

  //connect to the database


  //Routes
  app.get("/", (req, res) => res.send("API working"));
  app.get("/debug-sentry", function mainHandler(req, res) {
          throw new Error("My first Sentry error!");
  });

  // app.post("/webhooks", clerkWebhooks);
  app.post("/webhooks", clerkWebhooks);

  Sentry.setupExpressErrorHandler(app);
  
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
