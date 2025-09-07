
import React from 'react';

const loadingMessages = [
    "Analyzing driver data...",
    "Reviewing practice session pace...",
    "Calculating budget optimizations...",
    "Consulting the race engineers...",
    "Checking tire degradation stats...",
    "Building your podium-placing team..."
];

export const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = React.useState(loadingMessages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);


  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 border-8 border-f1-dark-gray border-t-f1-red rounded-full animate-spin"></div>
      <p className="text-xl text-f1-white mt-6 font-semibold tracking-wide">{message}</p>
    </div>
  );
};
