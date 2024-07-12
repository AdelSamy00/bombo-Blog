import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
export const register = async (req, res) => {
  console.log(req.body);
  const { username, email, password, birthDate, gender } = req.body;
  console.log(username, email, password, birthDate, gender);
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(500)
        .json({ message: 'there found anthor user using this email' });
    } else {
      const createdUser = await User.create({
        username,
        password: hashedPassword,
        email,
        birthDate,
        gender,
      });

      jwt.sign({ id: createdUser._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        req.session.isAuth = true;
        req.session.userId = createdUser._id;
        req.session.userImage = createdUser.profileImage;
        res
          .cookie('token', token, { sameSite: 'none', secure: true })
          .status(201)
          .json({
            id: createdUser._id,
            image: createdUser.profileImage,
            token,
          });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const passOk = bcrypt.compareSync(password, foundUser.password);
      if (passOk) {
        jwt.sign({ id: foundUser._id }, jwtSecret, {}, (err, token) => {
          req.session.isAuth = true;
          req.session.userId = foundUser._id;
          req.session.userImage = foundUser.profileImage;
          res
            .status(200)
            .cookie('token', token, { sameSite: 'none', secure: true })
            .json({
              id: foundUser._id,
              username: foundUser.username,
              token,
            });
        });
      } else {
        res
          .status(401)
          .json({ message: 'pleases check your password or email again' });
      }
    } else {
      res.status(404).json({ message: 'there arenot found any user' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'you are logout' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const isAuth = (req, res, next) => {
  if (req.session) {
    next();
  } else {
    res.status(401).json({ message: 'you arenot auther' });
  }
};

export const getProfile = async (req, res) => {
  try {
    console.log(req.session.userId);
    const user = await User.findById(
      { _id: req.session.userId },
      { password: 0 }
    )
      .populate('posts')
      .populate('friends');

    res.status(200).json({
      message: 'you are auther',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const editProfile = async (req, res) => {
  const formData = req.body;
  const profileImage = req.file;
  try {
    await User.findByIdAndUpdate(
      { _id: formData.id },
      {
        username: formData.username,
        birthDate: formData.birthDate,
        gender: formData.gender,
      }
    );
    if (profileImage) {
      await User.findByIdAndUpdate(
        { _id: formData.id },
        {
          profileImage: `./uploads/${profileImage.filename}`,
        }
      );
    }
    res.status(200).json({ message: 'Profile Updated.' });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong.' });
  }
};
