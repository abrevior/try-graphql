const mongoose = require('mongoose');
const { Schema, SchemaTypes } = require('mongoose');

const likeSchema = new Schema({
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


module.exports = mongoose.model('Like', likeSchema);