import react, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { motion, AnimatePresence } from 'framer-motion';

export default ({ children }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    copy(children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <>
      <button onClick={copyLink}>
        <div className="link">
          {children.replace('https://', '').replace('http://', '')}
        </div>
        <div className="cta">
          {copied ? 'copied!' : 'copy'}
          {/* <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <p>Copied to clipboard!</p>
            </motion.div>
          )}
        </AnimatePresence> */}
        </div>
      </button>
      <style jsx>{`
        button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 12px 18px;
          background: #f0f0f0;
          font-size: 14px;
          border: none;
          border-radius: 10px;
        }
        .link {
          text-align: left;
          color: #555555;
        }
        .cta {
          color: #d900fc;
        }
      `}</style>
    </>
  );
};
