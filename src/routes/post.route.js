const {Router} = require('express');
const router = Router();
const {postControllers} = require('../controllers');
const {invalidId} = require ('../middlewares/generic.midleware');
const {validationSchemma, validIDPost} = require('../middlewares/post.midleware')
const {validNickname} = require ('../middlewares/user.midleware')

const {validUser} = require('../middlewares/user.midleware');
const {contenidoSchema, creationSchema} = require('../schemas/post.schemas');

router.get('/getPost/:id',invalidId, postControllers.getPost);
router.get('/getAllPost', postControllers.getAllPosts);
router.get('/getAllUserPost/:id',invalidId,validUser, postControllers.getAllUserPost);
router.post('/createPost',validationSchemma(creationSchema), postControllers.createPost);
router.put('/updatePost/:id',invalidId, validIDPost,validationSchemma(contenidoSchema), postControllers.updatePost);
router.delete('/deletePost/:id',invalidId, validIDPost, postControllers.deletePost);


module.exports = router;