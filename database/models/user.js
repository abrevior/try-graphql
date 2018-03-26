const mongoose = require('mongoose');
const { Schema, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: SchemaTypes.String,
    required: true
  },
  lastName: {
    type: SchemaTypes.String,
    required: true
  },
  email: {
    type: SchemaTypes.String,
    required: true
  },
  passwordHash: {
    type: SchemaTypes.String,
    required: true
  }
}, {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);