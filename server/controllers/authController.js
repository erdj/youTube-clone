import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send({ message: 'User has been created', user: newUser });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  console.log(req.body);
  const { name: reqName, password: reqPassword } = req.body;

  const user = await User.findOne({ name: reqName });
  if (!user) return next(createError(404, 'User not found!'));

  const isCorrectPassword = bcrypt.compareSync(reqPassword, user.password);

  if (!isCorrectPassword) return next(createError(400, 'Wrong Credentials!'));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  const { password, ...otehrs } = user._doc;

  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(200);
  res.json(otehrs);
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY);

      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
