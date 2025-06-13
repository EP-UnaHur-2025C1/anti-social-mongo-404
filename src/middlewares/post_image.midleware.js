const Post_Image = require('../db/models/post_image');
const Post = require('../db/models/post');
const mongoose = require('mongoose');

const validationSchemma = (schema) =>{
    return (req, res, next) =>{
        const {error, _} = schema.validate(req.body, {abortEarly:false})
        if(error){
            return res.status(400).json(error)
        }
        next()
    }
}

const validIDImage = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de imagen inválido" });
  }
  const image = await Post_Image.findById(id);
  if (!image) {
    return res.status(400).json({ message: "Bad request: no se encuentra el IDimage" });
  }
  req.image = image;
  next();
};

module.exports = {validationSchemma, validIDImage};