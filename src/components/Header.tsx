
import React from 'react';
import { FormulaOneIcon } from './icons/FormulaOneIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-f1-black border-b-2 border-f1-red shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <FormulaOneIcon className="h-10 w-10 mr-4 text-f1-red" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-f1-white uppercase">
          F1 Fantasy Predictor
        </h1>
      </div>
    </header>
  );
};
