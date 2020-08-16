const Button = ({ children, disabled, onClick }) => {
  /* eslint-disable react/button-has-type */
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-block px-6 py-3 text-xl rounded-full bg-violet-500 hover:bg-violet-600 disabled:bg-gray-500"
    >
      {children}
    </button>
  );
};

export default Button;
