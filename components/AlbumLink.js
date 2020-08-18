import { useState } from 'react';
import copy from 'copy-to-clipboard';

const AlbumLink = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    copy(children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <button
        type="button"
        className="flex flex-row items-center justify-between w-full px-4 py-3 space-x-3 text-sm border-2 rounded-lg focus:outline-none border-violet-700 hover:border-violet-400 focus:border-violet-400 bg-violet-700"
        onClick={copyLink}
      >
        <div className="flex-shrink text-left truncate text-violet-200">
          {children.replace('https://', '').replace('http://', '')}
        </div>
        <div className="text-violet-400">{copied ? 'copied!' : 'copy'}</div>
      </button>
    </>
  );
};

export default AlbumLink;
