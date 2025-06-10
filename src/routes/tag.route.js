const {Router} = require('express');
const router = Router();
const {tagController} = require('../controllers');
const {invalidId} = require ('../middlewares/generic.midleware');
const {contenidoSchema} = require('../schemas/tag.schemas');
const {validationSchemma,validIDTag,validPostYTag,validAllTags} = require('../middlewares/tag.midleware');
const {validIDPost} = require('../middlewares/post.midleware');

router.get('/getTag/:id',invalidId,validIDTag, tagController.getTag);
router.get('/getAllTags',tagController.getAllTags);
router.post("/createTag", validationSchemma(contenidoSchema), tagController.createTag);
router.put("/updateTag/:id",invalidId,validIDTag,validationSchemma(contenidoSchema), tagController.updateTag);
router.delete("/deleteTag/:id",invalidId,validIDTag, tagController.deleteTag);
router.put("/addTagToPost/:idPost/:idTag",validPostYTag,validationSchemma(contenidoSchema), tagController.addTagToPost);
router.put("/addAllTagsToPost/:id",validIDPost,validAllTags, tagController.addAllTagsToPost);

module.exports = router;