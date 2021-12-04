import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <footer className="bg-gray-800 w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <div className="text-pink-300">
            <button
              className="btn btn-dark mb-3"
              onClick={() => history.goBack()}
            >
              &larr; Go Back
            </button>
          </div>
        )}
        <h4 className="text-pink-300">
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the SYMPHONY tech team.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
