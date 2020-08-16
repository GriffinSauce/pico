import theme from '~/lib/theme';

const ButtonSmall = ({ children, disabled, onClick }) => {
  const colors = 'border-violet-500 text-violet-500';
  const hoverColors = 'hover:border-violet-600 hover:text-violet-600';
  const disabledColors = 'disabled:border-gray-500 disabled:text-gray-500';
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-block px-3 py-2 text-base font-semibold bg-transparent border-2 rounded-full ${colors} ${hoverColors} ${disabledColors}`}
    >
      {children}
    </button>
  );
};

export default ButtonSmall;
