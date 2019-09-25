import react, { useEffect, useRef } from 'react';
import { Widget } from '@uploadcare/react-widget';

const fileInfoToMedia = fileInfo => ({
  url: fileInfo.cdnUrl,
  filename: fileInfo.name,
  type: fileInfo.mimeType,
});

export default ({ onChange }) => {
  return (
    <>
      <Widget
        publicKey="3ee62abfc85924be3d0e"
        multiple
        systemDialog
        onFileSelect={async filesInfo => {
          const files = await Promise.all(filesInfo.files());
          onChange(files.map(fileInfoToMedia));
        }}
      />
    </>
  );
};
