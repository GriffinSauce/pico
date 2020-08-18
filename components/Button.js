const Button = ({ children, disabled, onClick }) => {
  /* eslint-disable react/button-has-type */
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-block px-6 py-3 text-xl text-white rounded-full bg-violet-400 hover:bg-violet-500 disabled:bg-gray-500"
    >
      {children}
    </button>
  );
};

export default Button;
