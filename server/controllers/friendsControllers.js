import { Friend } from '../models/Friend.js';
import { User } from '../models/User.js';

export const addFriend = async (req, res) => {
  const { friendId, id } = req.body;
  console.log(friendId, id);
  const sender = await User.findById({ _id: id });
  const receiver = await User.findById({ _id: friendId });
  const existRequest = await Friend.findOne({
    sender: id || friendId,
    receiver: friendId || id,
  });
  if (existRequest) {
    return res.status(400).json({ message: 'Already sent Request' });
  }
  const friendRequest = await Friend.create({
    status: 'pending',
    sender: id,
    receiver: friendId,
  });
  /* sender.friends.push(friendRequest);
  sender.save();
  receiver.friends.push(friendRequest);
  receiver.save(); */
  /* const RequestToSender = {
    status: 'pending',
    request: 'sender',
    friend: receiver,
  };
  const RequestToReceiver = {
    status: 'pending',
    request: 'receiver',
    friend: sender,
  };
  sender.friends.push(RequestToSender);
  sender.save();
  //console.log(sender);
  receiver.friends.push(RequestToReceiver);
  receiver.save(); */
  res.status(200).send({ message: 'send request' });
};

export const getFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    console.log(userId);
    const request = await Friend.find({
      receiver: userId,
      status: 'pending',
    }).populate({
      path: 'sender',
      select: '-password',
    });
    res.status(200).json({
      data: request,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'auth error', success: false, error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const user = await User.findById({ _id: id }).populate('friends');
  res.status(200).json({ friends: user.friends });
};

export const acceptFriend = async (req, res) => {
  const { userId } = req.body.user;
  const { requestId } = req.body;
  const requestExist = await Friend.findOne({ _id: requestId });
  if (!requestExist) {
    next('No Friend Request Found!.');
    return;
  }
  const newRequest = await Friend.findByIdAndUpdate(
    { _id: requestId },
    { status: 'approval' },
    { new: true }
  );
  if (newRequest.status === 'approval') {
    const user = await User.findById({ _id: userId });
    user.friends.push(newRequest?.sender);
    await user.save();
    const friend = await User.findById({ _id: newRequest?.sender });
    friend.friends.push(newRequest?.receiver);
    await friend.save();
  }
  res.status(200).json({ message: 'accept' });
};

export const cancelFriend = async (req, res) => {
  const { requestId } = req.params;
  console.log(requestId);
  const friendRequest = await Friend.findByIdAndDelete({ _id: requestId });
  console.log(friendRequest);
  const sender = friendRequest.sender;
  const receiver = friendRequest.receiver;
  await User.findByIdAndUpdate(
    { _id: sender._id },
    { $pull: { friends: requestId } }
  );
  await User.findByIdAndUpdate(
    { _id: receiver._id },
    { $pull: { friends: requestId } }
  );
  res.status(200).json({ message: 'Canceled' });
};

export const getAllApprovalFriends = async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const user = await User.findById({ _id: id }).populate({
    path: 'friends',
    match: { status: 'approval' },
    populate: [
      {
        path: 'sender',
        select: {
          _id: 1,
          username: 1,
          profileImage: 1,
        },
      },
      {
        path: 'receiver',
        select: {
          _id: 1,
          username: 1,
          profileImage: 1,
        },
      },
    ],
  });
  res.status(200).json({ friends: user.friends });
};
