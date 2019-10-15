import React, { useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';

export default ({ small, ...props }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <button {...props} />
      <style jsx>{`
        button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 18px;
          color: ${theme.color.actionText};
          background-color: ${theme.color.action};
          border: none;
          border-radius: 100px;
          cursor: pointer;
        }
        button:hover {
          background-color: ${theme.color.actionHover};
        }
        button[disabled] {
          color: #fff;
          background-color: #ccc;
          border: none;
        }
      `}</style>
    </>
  );
};
