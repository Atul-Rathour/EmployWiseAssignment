import React from 'react';
import './loading.css'

const Loading = () => {
  // Prevent scrolling when component mounts
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset'; 
    };
  }, []);

  return (
    <div className="fixed inset-0 w-[100vw] h-[100vh] bg-white/30 backdrop-blur-md z-[100] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
        <span class="loader"></span>
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;