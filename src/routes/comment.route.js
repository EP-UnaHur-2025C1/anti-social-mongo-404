const {Router} = require('express');
const router = Router();
const {commentControllers} = require('../controllers');
const {invalidId} = require ('../middlewares/generic.midleware');
const {validationSchemma,validIDComment} = require('../middlewares/comment.midleware');
const {comentarioSchema} = require('../schemas/comment.schema');
const {validIDPost} = require('../middlewares/post.midleware')

router.get('/getComment/:id', invalidId, validIDComment, commentControllers.getComment);
router.get('/getAllComments', commentControllers.getAllComments);
router.get('/getAllComments/:id', invalidId, validIDPost, commentControllers.getAllPostComment);
router.post('/createComment/:id', invalidId, validIDPost, validationSchemma(comentarioSchema), commentControllers.createComment);
router.put('/updateComment/:id', invalidId, validIDComment, validationSchemma(comentarioSchema), commentControllers.updateComment);
router.delete('/deleteComment/:id', invalidId, validIDComment, commentControllers.deleteComment);

module.exports = router;