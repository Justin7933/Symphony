import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, title }) => {
  if (!notes.length) {
    return <h3 className="flex font-bold text-black-200 justify-center">No Notes Yet</h3>;
  }

  return (
    <div className="font-bold text-pink-300 rounded-full font-mono">
      <h3>{title}</h3>
      {notes &&
        notes.map((note) => (
          <div className="bg-gray-900 mt-5 mg-5 border border-black">
          <div key={note._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {/*Username here*/}
              <div className="ml-1 mb-5 mt-5 border font-bold text-green-500 rounded-full h-10 w-40 bg-black flex items-center justify-center font-mono">
              {note.noteAuthor} <br />
              </div>
              <div className="mb-5 mt-5 border font-bold text-green-500 rounded-full h-10 w-50 bg-black flex items-center justify-center font-mono">
              <span style={{ fontSize: '1rem' }}>
                had this thought on {note.createdAt}
              </span>
              </div>
            </h4>
            </div>

            <div className="mb-5 font-bold text-black-700 rounded-full bg-grey flex items-center justify-center font-monocard-body bg-light p-2">
              <p>{note.noteText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/notes/${note._id}`}
            >
              <div className="mb-5 mt-5 border font-bold text-green-500 rounded-full h-10 w-50 bg-black flex items-center justify-center font-mono">
              Join the discussion on this Note.
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
