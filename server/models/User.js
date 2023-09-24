import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: './unknown.png',
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  /* friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Friend',
    },
  ], */
  friends: [
    {
      request: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      friend: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

export const User = mongoose.model('User', userSchema);
