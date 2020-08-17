import AutosizeInput from 'react-input-autosize';

const AlbumTitle = (props) => {
  const { value } = props;

  return (
    <AutosizeInput
      inputClassName="inline-block py-2 font-display text-4xl text-center text-white bg-transparent text-center border-b-2 border-violet-600 focus:border-violet-400 border-solid focus:outline-none"
      inputStyle={{
        width: `${value.length}ch`,
        minWidth: `100px`,
      }}
      {...props}
    />
  );
};

export default AlbumTitle;
