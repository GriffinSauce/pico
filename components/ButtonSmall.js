import React, { useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';

export default props => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <button {...props} />
      <style jsx>{`
        button {
          display: inline-block;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          padding: 6px 12px;
          color: ${theme.color.action};
          background-color: transparent;
          border: 1px solid ${theme.color.action};
          border-radius: 100px;
        }
        button:hover {
          color: ${theme.color.actionHover};
          background-color: transparent;
          border: 1px solid ${theme.color.actionHover};
        }
        button[disabled] {
          color: #ddd;
          border: 1px solid #ddd;
        }
      `}</style>
    </>
  );
};
