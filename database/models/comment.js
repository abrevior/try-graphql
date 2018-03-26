const mongoose = require('mongoose');
const { Schema, SchemaTypes } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  postId: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  userId: {
    type: SchemaTypes.ObjectId,
    required: true
  }
}, {
    versionKey: false,
    timestamps: true
  }
);



module.exports = mongoose.model('Comment', commentSchema);