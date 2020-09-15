import { useState, useEffect, useRef } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import { storage } from '../lib/firebase';
import ProgressCircle from './ProgressCircle';
import Button from './Button';

const sum = (arr) => arr.reduce((newSum, num) => newSum + (num || 0), 0);

const fileToMedia = (file) => ({
  url: file.url,
  filename: file.name,
  type: file.type,
});

const ImageUpload = ({ onChange }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  // Compute avg. total progress
  const progress = Math.round(
    sum(files.map((file) => file.progress)) || 0 / files.length,
  );

  const reset = () => {
    // Reset
    setFiles([]);
    inputRef.current.value = '';
  };

  const onUploadsComplete = () => {
    onChange(files.map(fileToMedia));
    reset();
  };

  const onCancel = () => {
    files.map((file) => file.task?.cancel());
    reset();
  };

  const areUploadsComplete =
    files.length && files.every((file) => file.isComplete);
  useEffect(() => {
    if (areUploadsComplete) onUploadsComplete();
  }, [areUploadsComplete]);

  const handleChange = (event) => {
    if (!event.target.files.length) return;

    const filesArr = Array.from(event.target.files);

    setFiles(filesArr);

    filesArr.forEach((file, index) => {
      const onProgress = (snapshot) => {
        // progress
        const fileProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        // TODO: ew, use Immer
        setFiles((oldFiles) => {
          const updatedFiles = [...oldFiles];
          updatedFiles[index].progress = fileProgress;
          return updatedFiles;
        });
      };

      const onError = (error) => {
        // error
        console.log(error);
      };

      const onComplete = async () => {
        const firebaseObject = storage.ref('images').child(file.name);
        const url = await firebaseObject.getDownloadURL();

        // TODO: ew, use Immer
        setFiles((oldFiles) => {
          const updatedFiles = [...oldFiles];
          updatedFiles[index].url = url;
          updatedFiles[index].isComplete = true;
          return updatedFiles;
        });
      };

      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on('state_changed', onProgress, onError, onComplete);

      setFiles((oldFiles) => {
        const updatedFiles = [...oldFiles];
        updatedFiles[index].task = uploadTask;
        return updatedFiles;
      });
    });
  };

  const onSelectFiles = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        multiple
        accept="image/*,video/*"
        ref={inputRef}
        onChange={handleChange}
      />

      {files.length ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10">
            <ProgressCircle percentage={progress} />
          </div>
          <Button size="sm" onClick={onCancel}>
            <FiX className="-ml-1 text-xl" />
            <span>cancel</span>
          </Button>
        </div>
      ) : (
        <Button onClick={onSelectFiles}>
          <MdCameraAlt className="-ml-1 text-2xl" />
          <span>Add pictures</span>
        </Button>
      )}
    </>
  );
};

export default ImageUpload;
