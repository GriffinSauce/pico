import { useContext } from 'react';
import AutosizeInput from 'react-input-autosize';
import ThemeContext from '~/contexts/ThemeContext';

const AlbumTitle = props => {
  const { theme } = useContext(ThemeContext);
  const { value } = props;

  return (
    <>
      <div className="root">
        <AutosizeInput className="input" {...props} />
      </div>
      <style jsx>{`
        .root :global(input) {
          display: inline-block;
          margin: 100px 0 30px 0;
          padding: 5px 0;
          width: ${value.length}ch;
          min-width: 100px;
          font-family: ${theme.font.header};
          font-size: 36px;
          color: ${theme.color.textPrimary};
          background-color: transparent;
          text-align: center;
          border: none;
          border-bottom: 2px solid ${theme.color.actionSecondary};
        }
        .root :global(input:focus) {
          outline: none; /* NOTE: retain SOME obvious focus styling for a11y */
          border-bottom: 2px solid #d900fc;
        }
        .root :global(input:disabled) {
          color: ${theme.color.textPrimary};
        }
        .root :global(input:-ms-clear) {
          display: none;
        }
      `}</style>
    </>
  );
};

export default AlbumTitle;
