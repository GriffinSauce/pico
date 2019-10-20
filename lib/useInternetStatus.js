import { useEffect, useState } from 'react';

export default () => {
  const [isOnline, setOnline] = useState(
    process.browser ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
    };
    const handleOffline = () => {
      setOnline(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return function cleanup() {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnline]);
  return {
    isOnline,
  };
};
