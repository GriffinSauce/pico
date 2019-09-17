const mongoose = require('../lib/mongoose');
const { Schema } = mongoose;

console.log('Schema', Schema);

const Request = new Schema(
  {
    requester: {
      name: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ['image', 'video'],
        },
      },
    ],
  },
  {
    collection: 'request',
    id: true,
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

const Model = mongoose.model('Request', Request);

module.exports = Model;
