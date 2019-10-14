import react, { useState, useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';
import ButtonDarkMode from './ButtonDarkMode';

export default ({ children }) => {
  return (
    <>
      <main>
        <div className="view">{children}</div>
        <div className="darkMode">
          <ButtonDarkMode />
        </div>
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
        .darkMode {
          margin: 30px 0;
        }
      `}</style>
    </>
  );
};
