const Post_Image = require('../db/models/post_image');
const Post = require('../db/models/post');

const getImg = async (req, res) => {
  try {
    const image = req.image; 
    res.status(200).json(image);
  } catch (error){
    res.status(500).json({ message: 'Error al buscar la imagen', error: error.message });
  }
};

const getAllImages = async (req,res) => {
  try {
    const images = await Post_Image.find()
    if(images.length > 0){
      res.status(200).json(images);
    } else {
      res.status(400).json({error: 'No existen imagenes'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imagenes', error: error.message });
  }
};
 
const addImage = async (req, res) =>{
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    
    const newImage = new Post_Image({ url: req.body.url });
    await newImage.save();
    post.image.push(newImage._id);
    await post.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const addAllImages = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "El cuerpo de la petición debe ser un arreglo" });
    }
    for (const element of req.body) {
      if (element.url && typeof element.url === "string") {
        const newImage = new Post_Image({ url: element.url });
        await newImage.save();
        post.image.push(newImage._id);
      }
    }
    await post.save();

    res.status(201).json({ message: "Imágenes agregadas con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateImage = async (req, res) =>{
  try {
    const id = req.params.id
    const imageBuscada = await Post_Image.findByIdAndUpdate(id, req.body.url, { new:true });
    
    res.status(201).json({message: "Imagen modificada con exito"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const deleteImage = async (req, res) =>{
  try {
    const id = req.params.id
    const imageBuscada = await Post_Image.findByIdAndDelete(id)
    
    res.status(201).json({message: "Imagen borrada con exito"});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}
const getAllPostImage = async (req,res) => {
  try{
    const idPost = req.params.id
    const postBuscado = await Post.findById(idPost)
      .populate('image')
    
    res.status(201).json(postBuscado)
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


module.exports = {getImg,addImage,addAllImages,updateImage,deleteImage,getAllPostImage, getAllImages  };