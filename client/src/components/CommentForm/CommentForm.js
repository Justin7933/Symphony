import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ noteId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          noteId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="">
      <h4 className="mb-5 mt-5 border font-bold text-green-500 rounded-full h-10 w-50 bg-black flex items-center justify-center font-mono">What is your opinion on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 font-bold text-pink-200 ${
              characterCount === 280 || error ? 'text-pink' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2 font-bold text-pink-200">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input px-8 bg-black text-pink-200"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="border border-black rounded-full bg-black text-green-400 h-15 font-mono btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="mb-5 mt-5 border font-bold text-green-500 rounded-full h-10 w-50 bg-black flex items-center justify-center font-mono">
          You need to be logged in to share your thoughts. Please{' '}
          <div className="ml-1 mr-1">
          <Link to="/login">login</Link>
          </div>
           or
           <div className="ml-1 mr-1"> 
           <Link to="/signup">signup.</Link>
           </div>
        </p>
      )}
    </div>
  );
};

export default CommentForm;