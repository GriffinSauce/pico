import { motion } from 'framer-motion';

const ProgressCircle = ({ progress, color = '#fff', radius, stroke }) => {
  // const normalizedRadius = radius - stroke * 2;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <motion.circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        initial={{ strokeDashoffset }}
        animate={{ strokeDashoffset }}
      />
    </svg>
  );
};

export default ProgressCircle;
