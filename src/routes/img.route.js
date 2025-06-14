const {Router} = require('express');
const router = Router();
const {imgControllers} = require('../controllers');
const {invalidId, validSearch} = require ('../middlewares/generic.midleware');

const {validationSchemma} = require('../middlewares/post_image.midleware')
const {urlSchema,allImagesSchema} = require('../schemas/post_image.schema');
const Image = require('../db/models/post_image');


router.get('/getImage/:id', invalidId, validSearch(Image), imgControllers.getImg);
router.get('/getAllImages', imgControllers.getAllImages);
router.post('/addImage/:id',invalidId,validationSchemma(urlSchema), imgControllers.addImage);
router.post('/addAllImages/:id',invalidId,validationSchemma(allImagesSchema), imgControllers.addAllImages);
router.put('/updateImage/:id',invalidId, validSearch(Image),validationSchemma(urlSchema), imgControllers.updateImage);
router.delete('/deleteImage/:id',invalidId, validSearch(Image), imgControllers.deleteImage);
router.get('/getAllPostIMage/:id',invalidId,validSearch(Image), imgControllers.getAllPostImage);
module.exports = router;