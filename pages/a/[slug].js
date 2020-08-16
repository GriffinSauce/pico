import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import Layout from '~/components/Layout';
import Logo from '~/components/Logo';
import Uploader from '~/components/Uploader';
import Downloader from '~/components/Downloader';
import ButtonSmall from '~/components/ButtonSmall';
import AlbumLink from '~/components/AlbumLink';
import AlbumTitle from '~/components/AlbumTitle';
import Media from '~/components/Media';
import useInternetStatus from '~/lib/useInternetStatus';

function UploadPage({ host, request }) {
  if (!request) return null;

  const { isOnline } = useInternetStatus();

  const api = createApi({ host });

  const [title, setTitle] = useState(request.title);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTitleBlur = async () => {
    if (!title) {
      setTitle(request.title);
      return;
    }
    await api.updateRequest({
      id: request.id,
      update: { title },
    });
  };

  const [media, setMedia] = useState(request.media || []);

  const addMedia = async (newMedia) => {
    const updatedMedia = await api.addMedia({
      id: request.id,
      media: newMedia,
    });
    setMedia(updatedMedia);
  };

  const link = `${host}${request.uri}`;

  return (
    <Layout>
      <Head>
        <title>pico.link - {title}</title>
      </Head>

      <header className="flex justify-center">
        <Link href="/">
          <a>
            <Logo height={40} />
          </a>
        </Link>
      </header>

      <p className="my-6">
        Share this link with your friends
        <br />
        to let them add pictures and video.
      </p>

      <AlbumLink>{link}</AlbumLink>

      <AlbumTitle
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

          <div className="flex justify-center mt-6">
            <Downloader filename={request.id} media={media} />

            <div className="w-3" />

            <Link href="/">
              <ButtonSmall>make a new album</ButtonSmall>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-3 text-sm">
          You&apos;re offline, you can add and download pictures when
          you&apos;re connected
        </div>
      )}

      <Media media={media} />
    </Layout>
  );
}

UploadPage.getInitialProps = async ({ req, query: { slug } }) => {
  if (!slug) return {};

  const host = hostFromReq(req);
  const api = createApi({ host });

  const request = await api.getRequestBySlug({ slug });
  return { host, request };
};

export default UploadPage;
