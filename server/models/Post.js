import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    postImage: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
