import { useEffect, useState } from 'react';

export default () => {
  const [isOnline, setOnline] = useState(
    process.browser ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => {
      console.log('online');
      setOnline(true);
    };
    const handleOffline = () => {
      console.log('offline');
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
