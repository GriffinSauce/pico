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
      <style jsx global>{`
        .uploadcare--widget {
          width: 100%;
        }
        .uploadcare--widget__button_type_open,
        .uploadcare--widget__button_type_open:hover {
          padding: 12px 20px;
          font-size: 22px;
          color: #fff;
          background-color: #d900fc;
          border: none;
          border-radius: 100px;
          cursor: pointer;
        }
        .uploadcare--widget__button_type_open:hover {
          background-color: #c900ea;
        }
      `}</style>
    </>
  );
};
