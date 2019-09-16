import react, { useEffect } from 'react';
import { Widget } from '@uploadcare/react-widget';

export default ({ currentAvatar }) => {
  return (
    <>
      <Widget
        publicKey="3ee62abfc85924be3d0e"
        multiple
        systemDialog
        onFileSelect={files => {
          console.log('Files changed: ', files);
        }}
        onChange={info => console.log('Upload completed:', info)}
      />
    </>
  );
};
