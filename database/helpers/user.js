const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../../config.json');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

class UserHelper {
  async createUser(firstName, lastName, email, password) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('VVBVBVBVVVBVB')
    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash
    });

    return user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    console.log('User => ', user);
    if (!user) {
      throw new Error('Password or email is incorrect');
    }
    const resultCompare = await bcrypt.compare(password, user.passwordHash);
    console.log('ResultCompare => ', resultCompare);
    if (resultCompare) {
      const token = await jwt.sign({ _id: user._id }, config.secretKey);
      return {
        user, token
      }
    } else {
      throw new Error('Password or email is incorrect');
    }
  }
}

module.exports = new UserHelper();