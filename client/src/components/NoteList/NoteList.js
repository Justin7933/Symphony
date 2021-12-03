import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, title }) => {
  if (!notes.length) {
    return <h3>No Notes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {notes &&
        notes.map((note) => (
          <div key={note._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {note.noteAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this thought on {note.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{note.noteText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/notes/${note._id}`}
            >
              Join the discussion on this Note.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
