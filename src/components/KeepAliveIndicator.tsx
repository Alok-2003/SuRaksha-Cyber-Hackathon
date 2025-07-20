import React, { useState, useEffect } from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { keepAliveService } from '../services/keepAliveService';

/**
 * Visual indicator showing the status of the keep-alive service
 * Shows when the service is active and when it last pinged the API
 */
export const KeepAliveIndicator: React.FC = () => {
  const [isActive, setIsActive] = useState(keepAliveService.isRunning());
  const [lastPing, setLastPing] = useState<Date | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Update status every second
    const interval = setInterval(() => {
      setIsActive(keepAliveService.isRunning());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleManualPing = async () => {
    await keepAliveService.manualPing();
    setLastPing(new Date());
  };

  return (
    <div className="fixed bottom-4 hidden right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          {isActive ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-xs font-medium text-gray-700">
            Render API {isActive ? 'Active' : 'Inactive'}
          </span>
          {isActive && (
            <Activity className="w-3 h-3 text-green-500 animate-pulse" />
          )}
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="space-y-2 text-xs text-gray-600">
              <div>
                <strong>Status:</strong> {isActive ? 'Keep-alive running' : 'Service stopped'}
              </div>
              <div>
                <strong>API:</strong> securelink-prediction-api.onrender.com
              </div>
              <div>
                <strong>Interval:</strong> Every 14 minutes
              </div>
              {lastPing && (
                <div>
                  <strong>Last Manual Ping:</strong> {lastPing.toLocaleTimeString()}
                </div>
              )}
            </div>
            
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleManualPing}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
              >
                Ping Now
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
