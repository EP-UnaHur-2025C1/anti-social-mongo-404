const {Post_Image, Post } = require('../db/models/post_image');

//prueba a ver si comitea y no rompe 
const getImg = async (req,res) => {
    const data = await Post_Image.findOne({ where: { id: req.params.id }});
    res.status(200).json(data);
};

const getAllImages = async (req,res) => {
    const data = await Post_Image.findAll();
    res.status(200).json(data);
};

const addImage = async (req, res) =>{
    try {
        
        const post = await Post.findOne({where:{id : req.params.id}})
        const newPost = post.createImage({url:req.body.url})
        res.status(201).json({message: "Imagen agregada con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const addAllImages = async (req, res) =>{
    try {
        
        const post = await Post.findOne({where:{id : req.params.id}})

        const images = req.body.forEach(element => {
            console.log(element)
            post.createImage({url:element.url})
        });
        res.status(201).json({message: "Imagen agregadas con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const updateImage = async (req, res) =>{
    try {
        
        const idABuscar = await req.params.id
        
        const imageUpdated = await Post_Image.update(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            { url: req.body.url },
            {
              where: {
                id: idABuscar,
              },
            });
        res.status(201).json({message: "Imagen modificada con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const deleteImage = async (req, res) =>{
    try {
        const idABuscar = await req.params.id
        
        const deletedImage = await Post_Image.destroy(
            //HACER UN MIDLEWARE DE QUE NO QUIERA PONER UN NICK REPETIDO
            {where: {
                id: idABuscar,
              },
            });
            
            
        res.status(201).json({message: "Imagen borrada con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}
const getAllPostImage = async (req,res) => {
    const post = await Post.findOne({where:{id : req.params.id},
    include:'image'})
    
    res.status(200).json(post);
};


module.exports = {getImg,addImage,addAllImages,updateImage,deleteImage,getAllPostImage, getAllImages  };