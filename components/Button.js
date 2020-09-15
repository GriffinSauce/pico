const baseClasses =
  'inline-flex items-center justify-center rounded-full leading-none';

const sizes = {
  sm: 'px-3 py-2 text-base space-x-1',
  base: 'px-6 py-3 text-xl space-x-3',
};

const colors = {
  default: 'text-white bg-violet-400 hover:bg-violet-500 disabled:bg-gray-500',
  ghost:
    'bg-transparent border-violet-500 text-violet-500 font-semibold border-2 hover:border-violet-600 hover:text-violet-600 disabled:border-gray-500 disabled:text-gray-500',
};

const Button = ({
  children,
  disabled,
  color = 'default',
  size = 'base',
  onClick,
}) => {
  const className = [baseClasses, colors[color], sizes[size]].join(' ');
  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
