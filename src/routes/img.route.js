const {Router} = require('express');
const router = Router();
const {imgControllers} = require('../controllers');
const {invalidId} = require ('../middlewares/generic.midleware');
const {validIDPost} = require('../middlewares/post.midleware')
const {validationSchemma, validIDImage} = require('../middlewares/post_image.midleware')
const {urlSchema,allImagesSchema} = require('../schemas/post_image.schema');

router.get('/getImage/:id', invalidId, validIDImage, imgControllers.getImg);
router.get('/getAllImages', imgControllers.getAllImages);
router.post('/addImage/:id',invalidId,validationSchemma(urlSchema), imgControllers.addImage);
router.post('/addAllImages/:id',invalidId,validationSchemma(allImagesSchema), imgControllers.addAllImages);
router.put('/updateImage/:id',invalidId, validIDImage,validationSchemma(urlSchema), imgControllers.updateImage);
router.delete('/deleteImage/:id',invalidId, validIDImage, imgControllers.deleteImage);
router.get('/getAllPostIMage/:id',invalidId,validIDPost, imgControllers.getAllPostImage);
module.exports = router;