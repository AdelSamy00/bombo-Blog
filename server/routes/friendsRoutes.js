import express from 'express';
import {
  acceptFriend,
  addFriend,
  cancelFriend,
  getAllApprovalFriends,
  getUserFriends,
} from '../controllers/friendsControllers.js';

const router = express.Router();
router.post('/', addFriend);
router.get('/:id', getUserFriends);
// aprovel friend request
router.put('/', acceptFriend);
// cancel friend request
router.delete('/:requestId', cancelFriend);
//Get Approval Friends
router.get('/allApprovalFriends/:id', getAllApprovalFriends);
export default router;
