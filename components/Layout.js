const Layout = ({ children }) => {
  return (
    <>
      <main>
        <div className="view">{children}</div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .view {
          width: 100%;
          max-width: 400px;
          flex-grow: 1;
          padding: 30px;
        }
      `}</style>
    </>
  );
};

export default Layout;
