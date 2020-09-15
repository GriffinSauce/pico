import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const ProgressCircle = ({ percentage }) => {
  return (
    <CircularProgressbarWithChildren
      value={percentage}
      styles={{
        root: {},
        path: {
          stroke: `#c900ea`, // violet-500
          strokeLinecap: 'round',
        },
        trail: {
          stroke: '#2a277c',
          strokeLinecap: 'round',
        },
        text: {
          fill: '#c900ea',
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: '#c900ea',
        },
      }}
    >
      <span className="text-xs font-display">{`${percentage}%`}</span>
    </CircularProgressbarWithChildren>
  );
};

export default ProgressCircle;
