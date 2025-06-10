const {Comment} = require('../db/models/comment');
const validationSchemma = (schema) =>{
    return (req, res, next) =>{
        const {error, _} = schema.validate(req.body, {abortEarly:false})
        if(error){
            return res.status(400).json(error)
        }
        next()
    }
}

const validIDComment = async (req, res, next) =>{

    if(await Comment.findOne({where:{id:req.params.id}})){
        next()
    }
        
    else{
        return res.status(400).json({message:"Bad request: no se encuentra el IDComment"})
    }
    
}

module.exports = {validationSchemma,validIDComment};