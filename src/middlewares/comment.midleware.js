const Comment = require('../db/models/comment');
const validationSchemma = (schema) =>{
    return (req, res, next) =>{
        const {error, _} = schema.validate(req.body, {abortEarly:false})
        if(error){
            return res.status(400).json(error)
        }
        next()
    }
}

const validIDComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id }); // mongoose syntax
    if (comment) {
      return next();
    } else {
      return res.status(400).json({ message: 'Bad request: no se encuentra el ID del comentario' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'ID inválido', error: error.message });
  }
};

module.exports = {validationSchemma,validIDComment};