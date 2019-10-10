import react, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'react-image-lightbox';
import Head from 'next/head';
import Link from 'next/link';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import useInternetStatus from '~/lib/useInternetStatus';
import Layout from '~/components/Layout';
import Logo from '~/components/Logo';
import Uploader from '~/components/Uploader';
import Downloader from '~/components/Downloader';
import SmallButton from '~/components/SmallButton';
import AlbumLink from '~/components/AlbumLink';

function UploadPage({ host, request }) {
  if (!request) return null;

  const { isOnline } = useInternetStatus();

  const api = createApi({ host });

  const [title, setTitle] = useState(request.title);
  const onTitleChange = e => {
    setTitle(e.target.value);
  };
  const onTitleBlur = async () => {
    if (!title) {
      setTitle(request.title);
      return;
    }
    const updatedRequest = await api.updateRequest({
      id: request.id,
      update: { title },
    });
  };

  const [media, setMedia] = useState(request.media || []);

  const [viewMediaIndex, setViewMediaIndex] = useState(null);
  const isLightboxOpen = viewMediaIndex !== null;

  const addMedia = async media => {
    const updatedMedia = await api.addMedia({
      id: request.id,
      media,
    });
    setMedia(updatedMedia);
  };

  const link = `${host}${request.uri}`;

  return (
    <Layout>
      <Head>
        <title>pico.link - {title}</title>
      </Head>

      <Link href="/">
        <a>
          <Logo height={40} />
        </a>
      </Link>

      <p>
        Share this link with your friends to let them add pictures and video.
      </p>

      <AlbumLink>{link}</AlbumLink>

      <input
        value={title}
        onChange={onTitleChange}
        onBlur={onTitleBlur}
        disabled={!isOnline}
      />

      {isOnline ? (
        <>
          {process.browser ? (
            <Uploader requestId={request.slug} onChange={addMedia} />
          ) : null}

          <div className="actions">
            <Downloader filename={request.id} media={media} />

            <Link href="/">
              <SmallButton>make a new album</SmallButton>
            </Link>
          </div>
        </>
      ) : (
        <div className="offline">
          You're offline, you can add and download pictures when you're
          connected
        </div>
      )}

      <div className="media">
        {media.map((item, index) => (
          <figure
            className="media-item"
            key={item.url}
            onClick={() => {
              setViewMediaIndex(index);
            }}
          >
            <img src={`${item.url}-/scale_crop/230x230/center/`} />
          </figure>
        ))}
      </div>

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
              className="lightbox-download"
              href={`${media[viewMediaIndex].url}-/inline/no/`}
            >
              download
            </a>,
          ]}
        />
      )}

      <style jsx>{`
        p {
          margin: 30px 0;
        }

        input {
          display: inline-block;
          margin: 100px 0 30px 0;
          padding: 5px 0;
          width: ${title.length}ch;
          min-width: 100px;
          font-size: 36px;
          color: 000;
          text-align: center;
          border: none;
          border-bottom: 2px solid #e2e2e2;
        }
        input:focus {
          outline: none; /* NOTE: retain SOME obvious focus styling for a11y */
          border-bottom: 2px solid #d900fc;
        }
        input:disabled {
          color: #000;
        }

        .actions {
          margin: 30px 0 0 0;
        }
        :global(.actions > * + *) {
          margin-left: 10px;
        }

        .media {
          display: flex;
          margin: 30px 0 0 0;
          flex-wrap: wrap;
        }

        .media-item {
          position: relative;
          flex-basis: calc(33.333% - 10px);
          margin: 5px;
          background-color: #f0f0f0;
          border-radius: 6px;
          overflow: hidden;
          box-sizing: border-box;
        }

        .media-item img {
          width: 100%;
        }

        .lightbox-download {
          margin: 0 10px 0 0;
          padding: 6px 12px 7px 12px;
          color: #ddd;
          font-size: 12px;
          text-decoration: none;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .offline {
          margin: 10px auto 0;
          max-width: 250px;
          font-size: 12px;
        }
      `}</style>
    </Layout>
  );
}

UploadPage.getInitialProps = async ({ req, query: { slug } }) => {
  if (!slug) return {};

  const host = hostFromReq(req);
  const api = createApi({ host });

  let request;
  try {
    request = await api.getRequestBySlug({ slug });
  } catch (error) {
    throw error;
  }
  return { host, request };
};

export default UploadPage;
