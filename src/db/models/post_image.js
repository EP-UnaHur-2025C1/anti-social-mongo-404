const mongoose = require('mongoose');

const Post_Image = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  post_image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {
  timestamps: false
});

module.exports = mongoose.model('Post_Image', Post_Image);

