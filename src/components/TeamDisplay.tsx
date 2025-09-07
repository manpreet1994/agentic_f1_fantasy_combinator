
import React from 'react';
import type { SuggestedTeam } from '../types';

interface TeamDisplayProps {
  team: SuggestedTeam;
}

const PlayerCard: React.FC<{ name: string; cost: number; justification: string; type: string; }> = ({ name, cost, justification, type }) => (
    <div className="bg-f1-black p-4 rounded-lg border border-f1-dark-gray transform transition-transform hover:scale-105 hover:border-f1-red">
        <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold">{name}</h4>
            <span className="text-lg font-semibold bg-f1-red px-3 py-1 rounded-md text-white">${cost.toFixed(1)}M</span>
        </div>
        <p className="text-sm text-f1-light-gray mt-2 italic">"{justification}"</p>
    </div>
);


export const TeamDisplay: React.FC<TeamDisplayProps> = ({ team }) => {
  return (
    <div className="bg-f1-dark-gray/50 p-6 rounded-lg border border-f1-light-gray">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-3xl font-bold">Suggested Team</h2>
        <div className="text-right">
            <p className="text-lg text-f1-light-gray">Total Cost</p>
            <p className="text-2xl font-bold text-white">${team.totalCost.toFixed(1)}M</p>
            <p className="text-sm text-green-400">Budget Remaining: ${team.budgetRemaining.toFixed(1)}M</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-f1-red border-b-2 border-f1-red pb-1">Drivers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.drivers.map((d, index) => <PlayerCard key={index} {...d} type="Driver" />)}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-f1-red border-b-2 border-f1-red pb-1">Constructors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.constructors.map((c, index) => <PlayerCard key={index} {...c} type="Constructor" />)}
        </div>
      </div>
    </div>
  );
};
