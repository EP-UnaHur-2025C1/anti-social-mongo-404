const mongoose = require('mongoose');

const Post_Image = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
}, {
  timestamps: false
});

module.exports = mongoose.model('Post_Image', Post_Image);

