const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex-grow p-6 view">{children}</div>
      </main>

      <style jsx>{`
        .view {
          max-width: 400px;
        }
      `}</style>
    </>
  );
};

export default Layout;
