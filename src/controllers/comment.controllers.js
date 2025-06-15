const Comment = require('../db/models/comment');
const Post = require('../db/models/post')

const getComment = async (req, res) => {
    try {
        const data = await Comment.findById(req.params.id);
        
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const data = await Comment.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
  try {
    const postId = req.params.id; 
    const { comentario } = req.body;  
    if (!comentario) {
      return res.status(400).json({ error: 'El contenido del comentario es obligatorio.' });
    }
    const post = await Post.findById(postId).populate('user');
    
    const newComment = new Comment({
      comentario,
      post: post._id,
      user: post.user._id, 
    });
    await newComment.save();
    post.comment.push();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateComment = async (req, res) => {
  try {
    const commentBuscado = await Comment.findByIdAndUpdate(
      req.params.id,
      { comentario: req.body.comentario },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({ message: "Comentario modificado con éxito", comment: commentBuscado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id
    const commentBuscado = await Comment.findByIdAndDelete(id);
    
    await Post.findByIdAndUpdate(commentBuscado.post, {
      $pull: { comments: commentBuscado._id }
    });
    res.status(200).json({ message: "Comentario borrado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPostComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    const comments = await Comment.find({ post: post._id }).populate('user'); 
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {getComment,createComment,updateComment,deleteComment, getAllPostComment, getAllComments};