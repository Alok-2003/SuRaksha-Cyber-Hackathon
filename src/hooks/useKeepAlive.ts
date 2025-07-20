import { useEffect } from 'react';
import { keepAliveService } from '../services/keepAliveService';

/**
 * React hook to manage the keep-alive service
 * Automatically starts the service when component mounts and stops when unmounts
 */
export const useKeepAlive = () => {
  useEffect(() => {
    // Start the keep-alive service
    keepAliveService.start();

    // Cleanup function to stop the service when component unmounts
    return () => {
      keepAliveService.stop();
    };
  }, []);

  return {
    isRunning: keepAliveService.isRunning(),
    manualPing: () => keepAliveService.manualPing(),
    start: () => keepAliveService.start(),
    stop: () => keepAliveService.stop()
  };
};
