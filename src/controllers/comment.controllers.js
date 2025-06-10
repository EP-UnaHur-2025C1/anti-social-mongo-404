const {Comment, Post} = require('../db/models/comment');

const getComment = async (req,res) => {
    const data = await Comment.findOne({where:{id: req.params.id}});
    res.status(200).json(data);
};

const getAllComments = async (req,res) => {
    const data = await Comment.findAll();
    res.status(200).json(data);
};
const createComment = async (req, res) =>{
    try {
        
        const post = await Post.findOne({where:{id : req.params.id}})
        const newComment = post.createComment({comentario:req.body.comentario})
        res.status(201).json({message:"comentario creado con exito: "+newComment});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}

const updateComment = async (req, res) =>{
    try {
        
        const idABuscar = await req.params.id
        
        const commentUpdated = await Comment.update(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            { comentario: req.body.comentario },
            {
              where: {
                id: idABuscar,
              },
            });
        res.status(201).json({message:"comentario modificado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}

const deleteComment = async (req, res) =>{
    try {
        const idABuscar = await req.params.id
        
        const deletedComment = await Comment.destroy(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            {where: {
                id: idABuscar,
              },
            });
            
            
        res.status(201).json({message: "Comentario borrado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const getAllPostComment = async (req, res) =>{
    try {
        const idABuscar = await req.params.id
        
        const allComments = await Post.findOne(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            {where: {
                id: idABuscar,
              },
              include: 'comment'
            });
            
            
        res.status(201).json(allComments);
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}





module.exports = {getComment,createComment,updateComment,deleteComment, getAllPostComment, getAllComments};