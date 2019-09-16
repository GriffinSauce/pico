import react from 'react';
import { useRouter } from 'next/router';
import Uploader from '../../components/Uploader';

function UploadPage() {
  const router = useRouter();
  const { requestId } = router.query;
  return (
    <div>
      <h1>Get shit!</h1>

      <Uploader requestId={requestId} />
    </div>
  );
}

export default UploadPage;
