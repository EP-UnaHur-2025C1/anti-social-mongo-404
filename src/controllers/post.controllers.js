const Post = require('../db/models/post');
const User = require('../db/models/user');
const Comment = require('../db/models/comment');
const Post_Image = require('../db/models/post_image');
const Tag = require('../db/models/tag');


const getPost = async (req,res) => {
  try {
    const id = req.params.id
    const postBuscado = await Post.findById(id).populate('comment').populate('image').populate('tags');
    if (!postBuscado) {
      return res.status(404).json({ message: 'No se encontró el post' });
    }
    res.status(200).json(postBuscado);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el post', error: error.message });
  }
};

const getAllPosts = async (req,res) => {
  try {
    const posts = await Post.find().populate('comment').populate('image').populate('tags');
    if(posts.length > 0){
      res.status(200).json(posts);
    } else {
      res.status(400).json({error: 'No existen posteos'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts', error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { contenido, nickName } = req.body;
    const user = await User.findOne({ nickName });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado con ese nickName' });
    }
    const newPost = new Post({
      contenido,
      user: user._id
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({
      message: 'Hubo un error al crear el post',
      error: error.message
    });
  }
};

const updatePost = async (req, res) =>{
  try {
    const id = req.params.id
    const postBuscado = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!postBuscado) {
      res.status(404).json({ message: 'Post no encontrado' });
    }
    res.status(200).json({message: "Post actualizado con exito", post: postBuscado});
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error: error.message });
  }
}

const deletePost = async (req, res) =>{
  try {
    const id = req.params.id
    const postBuscado = await Post.findByIdAndDelete(id)
    if (!postBuscado) {
      res.status(404).json({ message: 'Post no encontrado' });
    }
    res.status(200).json({ message: 'Post eliminado con éxito' }); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const getAllUserPost = async (req,res) => {
    const user = await User.findOne({where:{id : req.params.id},
    include: [{
    model: Post,
    as: 'post',
    include: [
      {
        model: Comment,
        as: 'comment'
      },
      {
        model: Post_Image,
        as: 'image'
      },
      {
        model: Tag,
        as: 'Tags'
      }
    ]
  }]
});
    
    res.status(200).json(user);
};



module.exports = {getPost, createPost, updatePost,deletePost, getAllUserPost, getAllPosts};