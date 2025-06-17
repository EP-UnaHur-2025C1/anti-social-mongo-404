const {Router} = require('express');
const router = Router();
const {imgControllers} = require('../controllers');
const {invalidId, validSearch} = require ('../middlewares/generic.midleware');

const {validationSchemma} = require('../middlewares/post_image.midleware')
const {urlSchema,allImagesSchema} = require('../schemas/post_image.schema');
const Image = require('../db/models/post_image');
const Post = require('../db/models/post');


router.get('/getImage/:id', invalidId, validSearch(Image), imgControllers.getImg);
router.get('/getImages', imgControllers.getAllImages);/////
router.get('/getImagesToPost/:id', invalidId,validSearch(Post), imgControllers.getAllPostImage);
////router.post('/addImage/:id',invalidId,validationSchemma(urlSchema), imgControllers.addImage);
router.post('/addImages/:id',invalidId,validSearch(Post),validationSchemma(allImagesSchema), imgControllers.addAllImages);////////
router.put('/updateImage/:id',invalidId, validSearch(Image),validationSchemma(urlSchema), imgControllers.updateImage);
router.delete('/deleteImage/:id',invalidId, validSearch(Image), imgControllers.deleteImage);
//router.get('/getImages/:id',invalidId,validSearch(Image), imgControllers.getAllPostImage); /////////////
module.exports = router;