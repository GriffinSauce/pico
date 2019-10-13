import react, { useState, useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';

export default ({ children }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <>
      <main>
        <div>{children}</div>
      </main>
      {/* <button onClick={() => setDarkMode(!darkMode)}>Toggle dark mode</button> */}
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
        button {
          font-size: 20px;
        }
      `}</style>
    </>
  );
};
