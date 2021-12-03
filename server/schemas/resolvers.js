const { AuthenticationError } = require('apollo-server-express');
const { User, Note } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('notes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('notes');
    },
    notes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Note.find(params).sort({ createdAt: -1 });
    },
    note: async (parent, { noteId }) => {
      return Note.findOne({ _id: noteId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addNote: async (parent, { noteText, noteAuthor }) => {
      const note = await Note.create({ noteText, noteAuthor });

      await User.findOneAndUpdate(
        { username: noteAuthor },
        { $addToSet: { notes: note._id } }
      );

      return note;
    },
    addComment: async (parent, { noteId, commentText, commentAuthor }) => {
      return Note.findOneAndUpdate(
        { _id: noteId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeNote: async (parent, { noteId }) => {
      return Note.findOneAndDelete({ _id: noteId });
    },
    removeComment: async (parent, { noteId, commentId }) => {
      return Note.findOneAndUpdate(
        { _id: noteId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
