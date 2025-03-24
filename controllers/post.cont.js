
import ImageKit from "imagekit";
import Post from "../models/posts.model.js";
// import User from "../models/users.model.js";
import dotenv from "dotenv"
dotenv.config()


// ✅ GET ALL POSTS WITH FILTERS, PAGINATION & SORTING
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const query = {};
    const { cat, search, sort, featured } = req.query;

    if (cat) query.category = cat;
    if (search) query.title = { $regex: search, $options: "i" };
    if (featured) query.isFeatured = true;

    let sortObj = { createdAt: -1 };
    if (sort) {
      switch (sort) {
        case "newest": sortObj = { createdAt: -1 }; break;
        case "oldest": sortObj = { createdAt: 1 }; break;
        case "popular": sortObj = { visit: -1 }; break;
        case "trending":
          sortObj = { visit: -1 };
          query.createdAt = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
          break;
        default: break;
      }
    }

    const posts = await Post.find(query).sort(sortObj).limit(limit).skip((page - 1) * limit);
    const totalPosts = await Post.countDocuments(query);
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts", details: error.message });
  }
};

// ✅ GET A SINGLE POST BY SLUG
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post", details: error.message });
  }
};

// ✅ CREATE A NEW POST (Only Admins)
export const createPost = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    let slug = req.body.title.replace(/ /g, "-").toLowerCase();
    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    const newPost = new Post({ slug, ...req.body, author: req.user.userId });
    const post = await newPost.save();

    res.status(201).json({ message: "Post created", slug: post.slug, post });
  } catch (error) {
    res.status(500).json({ error: "Error creating post", details: error.message });
  }
};

// ✅ DELETE A POST (Only Admins)
export const deletePost = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found!" });

    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post", details: error.message });
  }
};

// ✅ TOGGLE FEATURED POST STATUS (Only Admins)
// ✅ UPDATE POST (Only Admins or Post Owner)
export const updatePost = async (req, res) => {
  try {
    const { title, content, isFeatured } = req.body; // Fields that can be updated
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    // ✅ Check if user is the owner or an admin
    if (post.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized to update this post!" });
    }

    // ✅ Update post fields if provided
    if (title) post.title = title;
    if (content) post.content = content;
    if (isFeatured !== undefined) post.isFeatured = isFeatured;

    await post.save();

    res.status(200).json({ message: "Post updated successfully!", post });
  } catch (error) {
    res.status(500).json({ error: "Error updating post", details: error.message });
  }
};



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