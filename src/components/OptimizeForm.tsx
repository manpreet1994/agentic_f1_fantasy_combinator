import React, { useState, useMemo, useCallback } from 'react';
import type { Player, SelectedTeam } from '../types';

interface OptimizeFormProps {
    onSubmit: (team: SelectedTeam) => void;
    onBack: () => void;
    fantasyData: Player[];
}

const PlayerSelect: React.FC<{
    players: Player[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
    disabledIds: string[];
}> = ({ players, value, onChange, placeholder, disabledIds }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-f1-dark-gray border border-f1-light-gray rounded-md p-3 text-f1-white focus:outline-none focus:ring-2 focus:ring-f1-red"
        >
            <option value="">{placeholder}</option>
            {players.map(p => (
                <option key={p.id} value={p.id} disabled={disabledIds.includes(p.id) && p.id !== value}>
                    {p.name} (${p.cost}M)
                </option>
            ))}
        </select>
    );
};


export const OptimizeForm: React.FC<OptimizeFormProps> = ({ onSubmit, onBack, fantasyData }) => {
    const [drivers, setDrivers] = useState<(string | null)[]>([null, null, null, null, null]);
    const [constructors, setConstructors] = useState<(string | null)[]>([null, null]);

    const { driverList, constructorList } = useMemo(() => {
        const dList = fantasyData.filter(p => p.type === 'driver');
        const cList = fantasyData.filter(p => p.type === 'constructor');
        return { driverList: dList, constructorList: cList };
    }, [fantasyData]);

    const handleDriverChange = (index: number, id: string) => {
        const newDrivers = [...drivers];
        newDrivers[index] = id;
        setDrivers(newDrivers);
    };

    const handleConstructorChange = (index: number, id: string) => {
        const newConstructors = [...constructors];
        newConstructors[index] = id;
        setConstructors(newConstructors);
    };

    const selectedIds = useMemo(() => [...drivers, ...constructors].filter(Boolean) as string[], [drivers, constructors]);

    const { totalCost, isValid } = useMemo(() => {
        const selectedPlayers = selectedIds.map(id => fantasyData.find(p => p.id === id)).filter(Boolean) as Player[];
        const cost = selectedPlayers.reduce((acc, p) => acc + p.cost, 0);
        const valid = selectedPlayers.length === 7 && cost <= 100.0;
        return { totalCost: cost, isValid: valid };
    }, [selectedIds, fantasyData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        const find_player = (id: string | null) => id ? fantasyData.find(p => p.id === id) || null : null;
        
        const submittedTeam: SelectedTeam = {
            drivers: drivers.map(find_player),
            constructors: constructors.map(find_player)
        };
        onSubmit(submittedTeam);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
             <button
              onClick={onBack}
              className="mb-6 bg-f1-dark-gray hover:bg-f1-light-gray text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <form onSubmit={handleSubmit} className="bg-f1-dark-gray/50 p-8 rounded-lg border border-f1-light-gray/50">
                <h2 className="text-3xl font-bold text-center mb-2">Build Your Current Team</h2>
                <p className="text-center text-f1-light-gray mb-8">Select your 5 drivers and 2 constructors to get optimization advice.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-f1-red">Drivers</h3>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <PlayerSelect 
                                    key={`driver-${i}`}
                                    players={driverList}
                                    value={drivers[i] || ''}
                                    onChange={(e) => handleDriverChange(i, e.target.value)}
                                    placeholder={`-- Select Driver ${i + 1} --`}
                                    disabledIds={selectedIds}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-f1-red">Constructors</h3>
                        <div className="space-y-3">
                            {[...Array(2)].map((_, i) => (
                                <PlayerSelect 
                                    key={`constructor-${i}`}
                                    players={constructorList}
                                    value={constructors[i] || ''}
                                    onChange={(e) => handleConstructorChange(i, e.target.value)}
                                    placeholder={`-- Select Constructor ${i + 1} --`}
                                    disabledIds={selectedIds}
                                />
                            ))}
                        </div>
                         <div className="mt-8 bg-f1-black/50 p-4 rounded-lg text-center">
                            <p className="text-f1-light-gray text-lg">Total Cost</p>
                            <p className={`text-3xl font-bold ${totalCost > 100 ? 'text-f1-red' : 'text-f1-white'}`}>
                                ${totalCost.toFixed(1)}M
                            </p>
                            <p className="text-sm text-f1-light-gray">Budget: $100.0M</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full md:w-auto bg-f1-red text-white font-bold text-lg py-3 px-12 rounded-lg transition-all duration-300 disabled:bg-f1-light-gray disabled:cursor-not-allowed disabled:scale-100 hover:scale-105"
                    >
                        Analyze My Team
                    </button>
                    {!isValid && selectedIds.length > 0 && <p className="text-red-400 mt-4">Please select 5 drivers and 2 constructors, and stay within the $100M budget.</p>}
                </div>
            </form>
        </div>
    );
};