const mongoose = require('mongoose');
const { Schema, SchemaTypes } = require('mongoose');

const postSchmea = new Schema({
  title: {
    type: SchemaTypes.String,
    required: true
  },
  topic: {
    type: SchemaTypes.String,
    required: true
  },
  content: {
    type: SchemaTypes.String,
    require: true
  },
  authorUserId: {
    type: SchemaTypes.ObjectId,
    required: true
  }
}, {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchmea);