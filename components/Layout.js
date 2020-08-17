const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div
          className="flex-grow p-6"
          style={{
            maxWidth: '400px',
          }}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
