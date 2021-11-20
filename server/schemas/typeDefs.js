const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    notes: [Note]!
  }

  type Note {
    _id: ID
    noteText: String
    noteAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    notes(username: String): [Note]
    note(noteId: ID!): Note
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNote(noteText: String!, noteAuthor: String!): Note
    addComment(
      noteId: ID!
      commentText: String!
      commentAuthor: String!
    ): Note
    removeNote(noteId: ID!): Note
    removeComment(noteId: ID!, commentId: ID!): Note
  }
`;

module.exports = typeDefs;

