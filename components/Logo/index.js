export default ({ height = 50 }) => (
  <>
    <img alt="" src="/logo.svg" />
    <style jsx>{`
      img {
        height: ${height}px;
      }
    `}</style>
  </>
);
