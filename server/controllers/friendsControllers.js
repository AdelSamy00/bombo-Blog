import { Friend } from '../models/Friend.js';
import { User } from '../models/User.js';

export const addFriend = async (req, res) => {
  const { friendId, id } = req.body;
  console.log(friendId, id);
  const sender = await User.findById({ _id: id });
  const receiver = await User.findById({ _id: friendId });
  const friendRequest = await Friend.create({
    status: 'pending',
    sender,
    receiver,
  });
  sender.friends.push(friendRequest);
  sender.save();
  receiver.friends.push(friendRequest);
  receiver.save();
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

export const getUserFriends = async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const user = await User.findById({ _id: id }).populate('friends');
  res.status(200).json({ friends: user.friends });
};

export const acceptFriend = async (req, res) => {
  const { requestId } = req.body;
  console.log(requestId);
  const request = await Friend.findByIdAndUpdate(
    { _id: requestId },
    { status: 'approval' }
  );
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
