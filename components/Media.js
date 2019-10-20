import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import MediaGrid from '~/components/MediaGrid';

export default ({ media }) => {
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
              className="lightbox-download"
              href={`${media[viewMediaIndex].url}-/inline/no/`}
            >
              download
            </a>,
          ]}
        />
      )}

      <style jsx>{`
        .lightbox-download {
          margin: 0 10px 0 0;
          padding: 6px 12px 7px 12px;
          color: #ddd;
          font-size: 12px;
          text-decoration: none;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};
