const {Post_Image} = require('../db/models/post_image');
const {Post} = require('../db/models/post');
const validationSchemma = (schema) =>{
    return (req, res, next) =>{
        const {error, _} = schema.validate(req.body, {abortEarly:false})
        if(error){
            return res.status(400).json(error)
        }
        next()
    }
}

const validIDImage = async (req, res, next) =>{

    if(await Post_Image.findOne({where:{id:req.params.id}})){
        next()
    }
        
    else{
        return res.status(400).json({message:"Bad request: no se encuentra el IDimage"})
    }
    
}

module.exports = {validationSchemma, validIDImage};