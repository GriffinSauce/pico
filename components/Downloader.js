import react, { useState } from 'react';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import SmallButton from './SmallButton';

/**
 * Fetch the content and return the associated promise.
 * @param {String} url the url of the content to fetch.
 * @return {Promise} the promise containing the data.
 */
function urlToPromise(url) {
  return new Promise(function(resolve, reject) {
    JSZipUtils.getBinaryContent(url, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default ({ media }) => {
  const [downloading, setDownloading] = useState(false);
  const [status, setStatus] = useState();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState();

  const doDownload = () => {
    setDownloading(true);

    var zip = new JSZip();

    media.forEach((mediaItem, index) => {
      zip.file(mediaItem.filename, urlToPromise(mediaItem.url), {
        binary: true,
      });
    });

    // when everything has been downloaded, we can trigger the dl
    zip
      .generateAsync({ type: 'blob' }, function updateCallback(metadata) {
        var msg = 'progression : ' + metadata.percent.toFixed(2) + ' %';
        if (metadata.currentFile) {
          msg += ', current file = ' + metadata.currentFile;
        }
        setStatus(msg);
        setProgress(metadata.percent | 0);
      })
      .then(
        function callback(blob) {
          // see FileSaver.js
          saveAs(blob, 'example.zip');

          setStatus('done !');
          setDownloading(false);
        },
        function(e) {
          setError(e);
        },
      );
  };

  return (
    <>
      {downloading ? (
        <div>{progress}%</div>
      ) : (
        <SmallButton disabled={!media.length} onClick={doDownload}>
          download all
        </SmallButton>
      )}

      {error ? <div>Error, please try again</div> : null}
    </>
  );
};
