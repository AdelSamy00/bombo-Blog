import { Post } from '../models/Post.js';
import { User } from '../models/User.js';

export const addPosts = async (req, res) => {
  const postData = req.body;
  const postImage = req.file;
  const date = postData.createdAt.split('-');
  postData.createdAt = `${date[2]}-${date[1]}-${date[0]}`;
  console.log(postData, postImage);
  const user = await User.findById({ _id: postData.userid });
  let createdPost;
  if (postImage) {
    createdPost = await Post.create({
      body: postData.description,
      date: postData.createdAt,
      postImage: `./posts/${postImage.filename}`,
      user: user,
    });
  } else {
    createdPost = await Post.create({
      body: postData.description,
      createdAt: postData.createdAt,
      user: user,
    });
  }
  user.posts.push(createdPost);
  await user.save();
  console.log(user);
  res.status(200).json({ message: 'Added Successfully' });
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate('user', {
      username: 1,
      profileImage: 1,
      _id: 1,
      email: 1,
    })
    .sort({ createdAt: -1 });
  res.status(200).json({ posts: posts });
};
