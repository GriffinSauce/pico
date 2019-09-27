import react, { useEffect, useRef } from 'react';
import { Widget } from '@uploadcare/react-widget';

if (process.browser) {
  window.UPLOADCARE_LOCALE_TRANSLATIONS = {
    buttons: {
      cancel: 'Cancel',
      remove: 'Remove',
      choose: {
        files: {
          one: 'Add a picture',
          other: 'Add a pictures',
        },
        images: {
          one: 'Add a picture',
          other: 'Add pictures',
        },
      },
    },
  };
}

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
        imagesOnly
        onFileSelect={async filesInfo => {
          const files = await Promise.all(filesInfo.files());
          onChange(files.map(fileInfoToMedia));
        }}
      />
    </>
  );
};
