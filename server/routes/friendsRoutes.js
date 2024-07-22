import express from 'express';
import {
  acceptFriend,
  addFriend,
  cancelFriend,
  getAllApprovalFriends,
  getFriendRequest,
  getUserFriends,
} from '../controllers/friendsControllers.js';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', addFriend);
router.get('/', userAuth, getFriendRequest);
router.get('/:id', getUserFriends);
// aprovel friend request
router.put('/', userAuth, acceptFriend);
// cancel friend request
router.delete('/:requestId', cancelFriend);
//Get Approval Friends
router.get('/allApprovalFriends/:id', getAllApprovalFriends);
export default router;
