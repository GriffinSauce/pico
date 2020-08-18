const baseClasses =
  'inline-flex items-center justify-center space-x-3 rounded-full';

const smallClasses = [
  baseClasses,
  'px-3 py-2 text-base font-semibold bg-transparent border-violet-500 text-violet-500 border-2',
  'hover:border-violet-600 hover:text-violet-600',
  'disabled:border-gray-500 disabled:text-gray-500',
].join(' ');

const defaultClasses = [
  baseClasses,
  'px-6 py-3 text-xl text-white bg-violet-400',
  'hover:bg-violet-500',
  'disabled:bg-gray-500',
].join(' ');

const Button = ({ children, disabled, small = false, onClick }) => {
  return (
    <button
      type="button"
      className={small ? smallClasses : defaultClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
