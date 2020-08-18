const colors = 'border-violet-500 text-violet-500';
const hoverColors = 'hover:border-violet-600 hover:text-violet-600';
const disabledColors = 'disabled:border-gray-500 disabled:text-gray-500';
const smallClasses = `inline-block px-3 py-2 text-base font-semibold bg-transparent border-2 rounded-full ${colors} ${hoverColors} ${disabledColors}`;

const defaultClasses =
  'inline-block px-6 py-3 text-xl text-white rounded-full bg-violet-400 hover:bg-violet-500 disabled:bg-gray-500';

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
