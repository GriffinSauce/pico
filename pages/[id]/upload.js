import react from 'react';
import { getRequest } from '~/lib/api';
import Uploader from '~/components/Uploader';

const baseFunctionsUrl =
  process.env === 'production'
    ? 'https://photo-request.netlify.com/.netlify/functions'
    : 'http://localhost:9000';

function UploadPage({ request }) {
  if (!request) return null;

  return (
    <div>
      <h1>{request.description}</h1>
      <p>{request.requester.name}</p>

      <Uploader requestId={request.slug} />
    </div>
  );
}

UploadPage.getInitialProps = async ({ query: { id } }) => {
  if (!id) return {};
  const request = await getRequest({ id });
  return { request };
};

export default UploadPage;
