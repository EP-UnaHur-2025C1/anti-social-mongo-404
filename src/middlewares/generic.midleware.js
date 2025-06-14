
const invalidId = (req, res, next) =>{
    if(req.params.id <= 0){
        return res.status(400).json({message:"Bad request: no se puede operar con un id negativo o igual a 0"})
    }

    next()
}


const validSearch = (model) => {
    return async (req, res, next) =>{
    if(await model.findById(req.params.id)){
        next()
    }
    else{
        return res.status(400).json({message:"Bad request: no se encuentra el elemento buscado"})
    }
}}

module.exports = {invalidId, validSearch}
