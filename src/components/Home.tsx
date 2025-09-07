
import React from 'react';

interface HomeProps {
  onSuggestNew: () => void;
  onOptimize: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSuggestNew, onOptimize }) => {
  return (
    <div className="text-center p-8 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">Welcome, Team Principal!</h2>
      <p className="text-lg text-f1-light-gray mb-8 max-w-2xl mx-auto">
        Get an AI-powered edge for the next race. Choose an option below to build your winning F1 Fantasy team.
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <button
          onClick={onSuggestNew}
          className="bg-f1-red hover:bg-red-700 text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Suggest a New Team
        </button>
        <button
          onClick={onOptimize}
          className="bg-f1-dark-gray hover:bg-f1-light-gray text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Optimize My Existing Team
        </button>
      </div>
    </div>
  );
};
