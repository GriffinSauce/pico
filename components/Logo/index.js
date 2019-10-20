export default ({ height = 50 }) => (
  <>
    <img alt="" src="/static/logo.svg" />
    <style jsx>{`
      img {
        height: ${height}px;
      }
    `}</style>
  </>
);
