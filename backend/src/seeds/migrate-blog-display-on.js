/**
 * One-off migration: give existing blogs displayOn = ["website"].
 * Run from /backend: node src/seeds/migrate-blog-display-on.js
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Blog from "../models/blogs/blog.model.js";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blogdb";

await mongoose.connect(MONGO_URI);
const res = await Blog.updateMany(
  { displayOn: { $exists: false } },
  { $set: { displayOn: ["website"] } },
);
console.log(`Updated ${res.modifiedCount} blog(s).`);
await mongoose.disconnect();
