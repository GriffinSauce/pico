import react, { useState, useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';

export default ({ children }) => {
  return (
    <>
      <main>
        <div className="view">{children}</div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .view {
          max-width: 400px;
          flex-grow: 1;
          padding: 30px;
        }
      `}</style>
    </>
  );
};
