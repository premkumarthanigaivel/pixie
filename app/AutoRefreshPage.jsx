import React, { useState, useEffect } from 'react';

const AutoRefreshPage = () => {
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(1);

  useEffect(() => {
    let interval;
    
    if (isAutoRefresh) {
      // Start refreshing immediately every second
      interval = setInterval(() => {
        window.location.reload();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoRefresh]);

  // Countdown display (separate from actual refresh)
  useEffect(() => {
    let countdownInterval;
    
    if (isAutoRefresh) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => prev <= 1 ? 1 : prev - 1);
      }, 100);
    } else {
      setCountdown(1);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [isAutoRefresh]);

  const handleManualRefresh = () => {
    window.location.reload();
  };

  const toggleAutoRefresh = () => {
    setIsAutoRefresh(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Auto Page Refresh
        </h1>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-indigo-600 mb-2">
              {isAutoRefresh ? "Refreshing..." : "Ready"}
            </div>
            <div className="text-sm text-gray-600">
              {isAutoRefresh ? 'Page will refresh every second' : 'Click start to begin auto-refresh'}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleAutoRefresh}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                isAutoRefresh
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isAutoRefresh ? 'Stop Auto Refresh' : 'Start Auto Refresh (1s)'}
            </button>
            
            <button
              onClick={handleManualRefresh}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
            >
              Refresh Now
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm text-gray-600">
              <div>Status: <span className="font-medium">{isAutoRefresh ? 'Auto-Refreshing' : 'Stopped'}</span></div>
              <div>Current Time: <span className="font-medium">{new Date().toLocaleTimeString()}</span></div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-3 rounded-md">
            <div className="text-xs text-red-800">
              <strong>⚠️ Warning:</strong> Once started, this will refresh the page every second until you stop it. 
              Make sure to click "Stop" before the first refresh or reload this page to stop the auto-refresh.
            </div>
          </div>

          {/* Simple alternative - paste this in browser console */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <div className="text-xs text-blue-800 mb-2">
              <strong>Alternative - Browser Console Code:</strong>
            </div>
            <code className="text-xs bg-white p-2 rounded block">
              setInterval(() =&gt; location.reload(), 1000);
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoRefreshPage;
