import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const friendSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
export const Friend = mongoose.model('Friend', friendSchema);
