const {Tag, Post, Post_tags} = require('../db/models/tag');

const getTag = async (req, res) =>{

  const tag = await Tag.findOne({where:{id:req.params.id}})
  res.status(201).json(tag);
}

const getAllTags = async (req, res) =>{

  const tag = await Tag.findAll()
  res.status(201).json(tag);
}

const createTag = async (req, res) =>{
    try {
        
        const newTag = await Tag.create({descripcion: req.body.descripcion})
        res.status(201).json({message: "tag creado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const updateTag = async (req, res) =>{
    try {
        
        const idABuscar = await req.params.id
        
        const tagUpdated = await Tag.update(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            { descripcion: req.body.descripcion },
            {
              where: {
                id: idABuscar,
              },
            });
        res.status(201).json({message: "tag modificado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}

const deleteTag = async (req, res) =>{
    try {
        console.log(Post_tags)
        const idABuscar = await req.params.id
        
        const deletedTag = await Tag.destroy(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            {where: {
                id: idABuscar,
              },
            });
            
            
        res.status(201).json({message: "tag borrado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}

const addTagToPost = async (req, res) =>{
        try {
            const idPostABuscar = req.params.idPost
            const idTagABuscar = req.params.idTag
            
            const post = await Post.findOne({where:{id : idPostABuscar}})
            const newPost = post.addTag(await Tag.findOne({where:{id : idTagABuscar}}))
                
                
            res.status(201).json({message: "tag agregado con exito"});
        } catch (e) {
            
            res.status(400).json({ error: e });
        }
}


const addAllTagsToPost = async (req, res) =>{
    try {
        
        const idPostABuscar = await req.params.id
        
        const post = await Post.findOne({where:{id : idPostABuscar}})

        req.body.forEach(async(element)=> {
          
          post.addTag(await Tag.findOne({where:{id:element.id}}))
          
        });
        
            
            
        res.status(201).json(post);
    } catch (e) {
        
        res.status(400).json({ error: e });
    }
}



module.exports = {createTag,updateTag,deleteTag,addTagToPost,addAllTagsToPost, getTag, getAllTags};