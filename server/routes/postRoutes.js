import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary, v2 } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: (await photoUrl).url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

export default router;
