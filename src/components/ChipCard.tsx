
import React from 'react';
import type { ChipAdvice } from '../types';

interface ChipCardProps {
  chipAdvice: ChipAdvice;
}

export const ChipCard: React.FC<ChipCardProps> = ({ chipAdvice }) => {
  return (
    <div className="bg-f1-dark-gray/50 p-6 rounded-lg h-full border border-f1-light-gray">
      <h3 className="text-2xl font-bold mb-4">Chip Strategy</h3>
      {chipAdvice.useChip ? (
        <div>
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-semibold text-green-400">Recommendation: Use a Chip</p>
          </div>
          <p className="text-xl font-bold text-f1-red bg-f1-black/50 inline-block px-3 py-1 rounded-md">{chipAdvice.chipName}</p>
          <p className="mt-3 text-f1-light-gray italic">"{chipAdvice.justification}"</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
             <p className="text-lg font-semibold text-yellow-400">Recommendation: Save Chips</p>
          </div>
           <p className="mt-2 text-f1-light-gray italic">"{chipAdvice.justification}"</p>
        </div>
      )}
    </div>
  );
};
