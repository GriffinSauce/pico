import { useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';

export default props => {
  const { theme } = useContext(ThemeContext);
  const { value } = props;

  return (
    <>
      <input {...props} />
      <style jsx>{`
        input {
          display: inline-block;
          margin: 100px 0 30px 0;
          padding: 5px 0;
          width: ${value.length}ch;
          min-width: 100px;
          font-size: 36px;
          color: ${theme.color.textPrimary};
          background-color: transparent;
          text-align: center;
          border: none;
          border-bottom: 2px solid ${theme.color.actionSecondary};
        }
        input:focus {
          outline: none; /* NOTE: retain SOME obvious focus styling for a11y */
          border-bottom: 2px solid #d900fc;
        }
        input:disabled {
          color: ${theme.color.textPrimary}
      `}</style>
    </>
  );
};
