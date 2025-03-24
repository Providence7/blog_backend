import  Comment from '../models/comments.model.js';
import  Post  from '../models/posts.model.js'; // Assuming a Post model is created

// Get comments for a specific post
export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate('userId', 'username profilePicture');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Post a comment for a specific post
export const postComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const comment = new Comment({
      postId,
      userId: req.user.id,
      content,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
};
