import { useRef } from 'react';
import { Widget } from '@uploadcare/react-widget';
import { MdCameraAlt } from 'react-icons/md';
import Button from '~/components/Button';

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

const fileInfoToMedia = (fileInfo) => ({
  url: fileInfo.cdnUrl,
  filename: fileInfo.name,
  type: fileInfo.mimeType,
});

const Uploader = ({ onChange }) => {
  const widgetApi = useRef();

  return (
    <>
      <div>
        <Button onClick={() => widgetApi.current.openDialog()}>
          <span className="flex items-center justify-center space-x-3">
            <MdCameraAlt className="-ml-1 text-2xl" />
            <span>Add pictures</span>
          </span>
        </Button>
      </div>
      <Widget
        ref={widgetApi}
        publicKey="3ee62abfc85924be3d0e"
        multiple
        systemDialog
        imagesOnly
        onFileSelect={async (filesInfo) => {
          const files = await Promise.all(filesInfo.files());
          onChange(files.map(fileInfoToMedia));
        }}
      />
      <style jsx global>{`
        .uploadcare--widget {
          display: block;
          width: 100%;
        }
        .uploadcare--widget__button_type_open {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Uploader;
