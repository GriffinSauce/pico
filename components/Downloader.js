import { useState } from 'react';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import Button from './Button';
import ProgressCircle from './ProgressCircle';

/**
 * Fetch the content and return the associated promise.
 * @param {String} url the url of the content to fetch.
 * @return {Promise} the promise containing the data.
 */
function urlToPromise(url) {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const Downloader = ({ filename, media }) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState();

  const doDownload = () => {
    setDownloading(true);

    const zip = new JSZip();

    media.forEach((mediaItem) => {
      zip.file(mediaItem.filename, urlToPromise(mediaItem.url), {
        binary: true,
      });
    });

    // when everything has been downloaded, we can trigger the download
    zip
      .generateAsync({ type: 'blob' }, function updateCallback(metadata) {
        setProgress(Math.round(metadata.percent) || 0);
      })
      .then(
        (blob) => {
          saveAs(blob, `${filename}.zip`); // see FileSaver.js
          setDownloading(false);
        },
        (err) => {
          setError(err);
        },
      );
  };

  return (
    <>
      {downloading ? (
        <div className="flex-shrink-0 w-10 h-10">
          <ProgressCircle percentage={progress} />
        </div>
      ) : (
        <Button
          size="sm"
          color="ghost"
          disabled={!media.length}
          onClick={doDownload}
        >
          download all
        </Button>
      )}

      {error ? <div>Error, please try again</div> : null}
    </>
  );
};

export default Downloader;
