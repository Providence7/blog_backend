
import ImageKit from "imagekit";
import Post from "../models/posts.model.js";
// import User from "../models/users.model.js";
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const query = {};

  console.log(req.query);

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }


  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  const posts = await Post.find(query)
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  try {
    const query = { slug: req.params.slug };

    const post = await Post.findOne(query);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post", details: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    let slug = req.body.title.replace(/ /g, "-").toLowerCase();

    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    const newPost = new Post({ slug, ...req.body });

    const post = await newPost.save();
    res.status(201).json({ message: "Post created", slug: post.slug, post }); // ✅ Ensure slug is sent
  } catch (error) {
    res.status(500).json({ error: "Error creating post", details: error.message });
  }
};


export const deletePost = async (req, res) => {
 
  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedPost) {
    return res.status(403).json("You can delete only your posts!");
  }

  res.status(200).json("Post has been deleted");
};

export const featurePost = async (req, res) => {
  const postId = req.body.postId;

 

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
};
export const updateUser = async (req,res) =>{
  try {
    const { slug } = req.params;
    const { title, category, desc, content, img } = req.body;

    // Find and update the post by slug
    const updatedPost = await Post.findOneAndUpdate(
      { slug }, // Find by slug
      { title, category, desc, content, img }, // Update fields
      { new: true } // Return updated post
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const
 imagekit 
=
 
new
 
ImageKit
(
{

    publicKey 
:
 
process.env.IK_PUBLIC_KEY
,

    privateKey 
:
 
process.env.IK_PRIVATE_KEY
,

    urlEndpoint 
:
 
process.env.IK_URL_ENDPOINT

}
)
;

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
