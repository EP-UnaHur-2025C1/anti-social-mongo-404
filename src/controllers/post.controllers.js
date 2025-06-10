const {Post, User, Comment, Post_Image, Tag} = require('../db/models/post');

const getPost = async (req,res) => {
    const data = await Post.findOne({where:{id: req.params.id},include: [
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
    ]});
    if(data){
      res.status(200).json(data);
    } else {
      res.status(400).json({error: 'No existe posteo'});
    }
};


const getAllPosts = async (req,res) => {
    const data = await Post.findAll({include: [
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
    ]});
    if(data){
      res.status(200).json(data);
    } else {
      res.status(400).json({error: 'No existen posteos'});
    }
};


const createPost = async (req, res) =>{
    try {
        
        const user = await User.findOne({where:{nickName : req.body.nickName}})
        const newPost = user.createPost({contenido:req.body.contenido})
        res.status(201).json({message: "Post creado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: 'hubo un error al crear el post' });
      }
}
const updatePost = async (req, res) =>{
    try {
        
        const idABuscar = await req.params.id
        
        const postUpdated = await Post.update(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            { contenido: req.body.contenido },
            {
              where: {
                id: idABuscar,
              },
            });
        res.status(201).json({message: "Post modificado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const deletePost = async (req, res) =>{
    try {
        const idABuscar = await req.params.id
        
        const deletedPost = await Post.destroy(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            {where: {
                id: idABuscar,
              },
            });
            
            
        res.status(201).json({message: "Post borrado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
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