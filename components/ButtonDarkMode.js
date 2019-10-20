import { useContext } from 'react';
import SVG from 'react-inlinesvg';
import ThemeContext from '~/contexts/ThemeContext';

export default () => {
  const { theme, darkMode, setDarkMode } = useContext(ThemeContext);

  /* eslint-disable react/button-has-type */
  return (
    <>
      <button type="button" onClick={() => setDarkMode(!darkMode)}>
        <SVG src="/icon-darkmode.svg" />
      </button>
      <style jsx>{`
        button {
          display: inline-block;
          cursor: pointer;
          padding: 12px;
          background-color: transparent;
          border: 1px solid ${theme.color.action};
          border-radius: 100px;
          transition: 150ms ease border-color;
        }
        button :global(svg > path) {
          fill: ${theme.color.action};
          transition: 150ms ease fill;
        }
        button:hover {
          border-color: #e9ff00;
        }
        button:hover :global(svg > path) {
          fill: #e9ff00;
        }
      `}</style>
    </>
  );
};
