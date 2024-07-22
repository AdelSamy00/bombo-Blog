import { Post } from '../models/Post.js';
import { User } from '../models/User.js';
import JWT from 'jsonwebtoken';

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
  const { token, search } = req.query;
  const userToken = JWT.verify(token, process.env.JWT_SECRET);
  const userId = userToken.id;
  const user = await User.findById({ _id: userId });
  const friends = user?.friends?.toString().split(',') ?? [];
  friends.push(userId);
  //console.log(friends);
  const searchPostQuery = {
    $or: [
      {
        description: { $regex: search, $options: 'i' },
      },
    ],
  };
  const posts = await Post.find(search ? searchPostQuery : {})
    .populate('user', {
      username: 1,
      profileImage: 1,
      _id: 1,
      email: 1,
      friends: 1,
    })
    .sort({ _id: -1 });

  //console.log(posts);
  const friendsPosts = posts?.filter((post) => {
    const postFrinds = post?.user?.friends?.toString().split(',') ?? [];
    return friends.includes(post?.user?._id.toString());
  });
  //console.log('first', friendsPosts);
  const otherPosts = posts?.filter(
    (post) => !friends.includes(post?.user?._id.toString())
  );
  let postsRes = null;
  if (friendsPosts?.length > 0) {
    postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
  } else {
    postsRes = posts;
  }
  res.status(200).json({ posts: postsRes });
};
