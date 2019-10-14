import react, { useState, useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';
import ButtonDarkMode from './ButtonDarkMode';

export default ({ children }) => {
  return (
    <>
      <main>
        <div>{children}</div>
      </main>

      <ButtonDarkMode />

      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
        }
        div {
          max-width: 400px;
          flex-basis: 100%;
          padding: 30px;
        }
      `}</style>
    </>
  );
};
