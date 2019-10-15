import react, { useState, useContext } from 'react';
import ThemeContext from '~/contexts/ThemeContext';
import copy from 'copy-to-clipboard';
import { motion, AnimatePresence } from 'framer-motion';

export default ({ children }) => {
  const { theme } = useContext(ThemeContext);
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
          font-size: 14px;
          background: #2a277c; /* TODO: Use calculation */
          border: 1px solid #2a277c;
          border-radius: 10px;
          cursor: pointer;
        }
        button:focus {
          outline: none;
          border: 1px solid ${theme.color.action};
        }
        .link {
          text-align: left;
          color: #fff;
        }
        .cta {
          color: ${theme.color.action};
        }
      `}</style>
    </>
  );
};
