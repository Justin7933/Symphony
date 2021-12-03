import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($noteText: String!, $noteAuthor: String!) {
    addNote(noteText: $noteText, noteAuthor: $noteAuthor) {
      _id
      noteText
      noteAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $noteId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      noteId: $noteId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      noteText
      noteAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
