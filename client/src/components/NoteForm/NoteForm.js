import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_NOTE } from '../../utils/mutations';
import { QUERY_NOTES} from '../../utils/queries';

import Auth from '../../utils/auth';

const NoteForm = () => {
  const [noteText, setNoteText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      try {
        const { notes } = cache.readQuery({ query: QUERY_NOTES });

        cache.writeQuery({
          query: QUERY_NOTES,
          data: { notes: [addNote, ...notes] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: {
          noteText,
          noteAuthor: Auth.getProfile().data.username,
        },
      });

      setNoteText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'noteText' && value.length <= 280) {
      setNoteText(value);
      setCharacterCount(value.length);
    }
  };
  return (
    <div>
      <h3 className="mt-6 mb-6 border border-white bg-black flex text-3xl text-green-500 h-10 w-100 justify-center mr-50 font-mono">What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
        <div className="flex justify-center">
          <p
            className={`m-0 font-bold text-pink-200 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          </div>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="mt-5 flex justify-center">
            <div className="col-12 col-lg-9">
              <textarea
                name="noteText"
                placeholder="Here's a new note..."
                value={noteText}
                className="form-input px-9 py-18 bg-black text-pink-200 "
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            </div>
            
            <div className="border border-white bg-black text-green-500 text-2xl flex rounded-full font-mono justify-center col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Note
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p className="flex text-green-500 justify-center">
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

export default NoteForm;