import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import MediaGrid from './MediaGrid';

const Media = ({ media }) => {
  const [viewMediaIndex, setViewMediaIndex] = useState(null);
  const isLightboxOpen = viewMediaIndex !== null;

  return (
    <>
      <MediaGrid media={media} onClickItem={setViewMediaIndex} />

      {isLightboxOpen && (
        <Lightbox
          mainSrc={media[viewMediaIndex].url}
          nextSrc={media[(viewMediaIndex + 1) % media.length].url}
          prevSrc={
            media[(viewMediaIndex + media.length - 1) % media.length].url
          }
          animationDuration={100}
          onCloseRequest={() => setViewMediaIndex(null)}
          onMovePrevRequest={() =>
            setViewMediaIndex(
              (viewMediaIndex + media.length - 1) % media.length,
            )
          }
          onMoveNextRequest={() =>
            setViewMediaIndex((viewMediaIndex + 1) % media.length)
          }
          toolbarButtons={[
            <a
              key="download-btn"
              className="px-3 py-2 mr-3 text-sm leading-none text-gray-300 border border-gray-300 rounded hover:border-white hover:text-white"
              href={`${media[viewMediaIndex].url}-/inline/no/`}
            >
              download
            </a>,
          ]}
        />
      )}
    </>
  );
};

export default Media;
