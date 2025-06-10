const {Router} = require('express');
const router = Router();
const {userControllers} = require('../controllers');
const {validUser, validNickname,validEmail , validationSchemma, validationEmailSchema} = require ('../middlewares/user.midleware')
const {invalidId} = require ('../middlewares/generic.midleware')
const {schema, emailSchema} = require('../schemas/user.schemas')

router.get('/getUser/:id',invalidId, validUser, userControllers.getUsers);
router.get('/getAllUsers', userControllers.getAllUser)
router.post('/createUser', validationSchemma(schema) ,userControllers.createUser);
router.put('/updateNickName/:id',invalidId,validUser, validNickname, userControllers.updateNickName)//arreglar, hacer un midleware para que no haya un nick igual- HECHO
router.post('/seguirUsuario/:id/:idASeguir',invalidId, userControllers.followUser)//
router.put('/updateEmail/:id',invalidId,validUser,validEmail,validationEmailSchema(emailSchema), userControllers.updateEmail)// aca tambien voy a hacer una funcion que si cambia el mail no sea el mismo
router.delete('/deleteUser/:id',invalidId,validUser, userControllers.deleteUser)
module.exports =  router ;