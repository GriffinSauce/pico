import React from 'react';
import SVG from 'react-inlinesvg';

export default ({ height = 50 }) => (
  <>
    <img src="/static/logo.svg" />
    <style jsx>{`
      img {
        height: ${height}px;
      }
    `}</style>
  </>
);
