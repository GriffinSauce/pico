export default ({ children }) => (
  <>
    <main>
      <div>{children}</div>
    </main>
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
