const nanoid = require('nanoid');
const mongoose = require('~/lib/mongoose');

const { Schema } = mongoose;

const MODEL_NAME = 'Request';
const Request = new Schema(
  {
    slug: {
      type: String,
      unique: true,
      default: () => nanoid(),
    },
    title: {
      type: String,
      default: 'My album',
    },
    media: [
      {
        url: String,
        type: {
          type: String,
        },
        filename: String,
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

Request.virtual('uri').get(function generateSlug() {
  return `/a/${this.slug}`;
});

delete mongoose.connection.models[MODEL_NAME]; // Prevent error "Cannot overwrite model once compiled"
const Model = mongoose.model(MODEL_NAME, Request);

module.exports = Model;
