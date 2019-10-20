import ButtonSmall from './ButtonSmall';
import ProgressCircle from './ProgressCircle';

const Downloader = ({ downloading, disabled, progress, onClick }) => {
  return (
    <>
      {downloading ? (
        <ProgressCircle stroke={4} radius={20} progress={progress} />
      ) : (
        <ButtonSmall disabled={disabled} onClick={onClick}>
          download all
        </ButtonSmall>
      )}
    </>
  );
};

export default Downloader;
