import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { OptimizeForm } from './components/OptimizeForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TeamDisplay } from './components/TeamDisplay';
import { ChipCard } from './components/ChipCard';
import { suggestNewTeam, optimizeExistingTeam } from './services/geminiService';
import { fetchFantasyData } from './services/fantasyDataService';
import { mockFantasyData } from './services/mockData';
import type { FantasyResponse, Player, SelectedTeam } from './types';

type View = 'home' | 'newTeamResult' | 'optimizeForm' | 'optimizeResult';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FantasyResponse | null>(null);
  const [transfers, setTransfers] = useState<{ out: Player, in: Player, justification: string }[]>([]);
  
  const [fantasyData, setFantasyData] = useState<Player[] | null>(null);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsFetchingData(true);
    setFetchError(null);
    try {
      const data = await fetchFantasyData();
      setFantasyData(data);
      setUsingMockData(false); // If fetch succeeds, ensure we're not in mock mode.
    } catch (err) {
      if (err instanceof Error) {
          setFetchError(err.message);
      } else {
          setFetchError('An unknown error occurred while fetching fantasy data.');
      }
      console.error(err);
    } finally {
      setIsFetchingData(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSuggestNewTeam = async () => {
    if (!fantasyData) return;
    setView('newTeamResult');
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await suggestNewTeam(fantasyData);
      setResult(response);
    } catch (err) {
      setError('Failed to generate team suggestion. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizeTeam = async (currentTeam: SelectedTeam) => {
    if (!fantasyData) return;
    setView('optimizeResult');
    setIsLoading(true);
    setError(null);
    setResult(null);
    setTransfers([]);
    try {
      const response = await optimizeExistingTeam(currentTeam, fantasyData);
      setResult(response);
      setTransfers(response.transfers || []);
    } catch (err) {
      setError('Failed to generate team optimization. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setView('home');
    setError(null);
    setResult(null);
    setTransfers([]);
  }
  
  const handleUseMockData = () => {
    setFantasyData(mockFantasyData);
    setUsingMockData(true);
    setFetchError(null);
  };
  
  const handleRetryFetch = async () => {
    setIsRefetching(true);
    try {
      const data = await fetchFantasyData();
      setFantasyData(data);
      setUsingMockData(false); // Success! Switch off mock data mode.
    } catch (error) {
      console.error("Refetch failed:", error);
      alert("Failed to fetch live data again. The API might still be unavailable. Please try again later.");
    } finally {
      setIsRefetching(false);
    }
  };

  const renderContent = () => {
    if (isFetchingData) {
      return <LoadingSpinner />;
    }

    if (fetchError) {
      return (
        <div className="text-center p-8 animate-fade-in">
          <h2 className="text-2xl text-f1-red font-bold mb-4">Connection Error</h2>
          <p className="text-f1-light-gray mb-6 bg-f1-dark-gray/50 p-4 rounded-md whitespace-pre-wrap">{fetchError}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-f1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Retry Connection
            </button>
            <button
              onClick={handleUseMockData}
              className="bg-f1-dark-gray hover:bg-f1-light-gray text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Continue with Sample Data
            </button>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-f1-red text-xl mb-4">{error}</p>
                <button
                    onClick={handleBack}
                    className="bg-f1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    switch (view) {
      case 'home':
        return <Home onSuggestNew={handleSuggestNewTeam} onOptimize={() => setView('optimizeForm')} />;
      case 'optimizeForm':
        return <OptimizeForm fantasyData={fantasyData!} onSubmit={handleOptimizeTeam} onBack={handleBack} />;
      case 'newTeamResult':
      case 'optimizeResult':
        if (!result) return null;
        return (
          <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
            <button
              onClick={handleBack}
              className="mb-6 bg-f1-dark-gray hover:bg-f1-light-gray text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Start Over
            </button>
            {view === 'optimizeResult' && transfers.length > 0 && (
                <div className="mb-8 bg-f1-dark-gray/50 p-6 rounded-lg border border-f1-light-gray">
                    <h2 className="text-2xl font-bold mb-4 text-f1-red">Suggested Transfers</h2>
                    <div className="space-y-4">
                        {transfers.map((t, i) => (
                            <div key={i} className="p-4 bg-f1-black rounded-md">
                               <div className="flex items-center justify-between">
                                 <div className="text-center">
                                     <p className="text-sm text-f1-light-gray">OUT</p>
                                     <p className="font-bold text-lg">{t.out.name}</p>
                                 </div>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-f1-red mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                 </svg>
                                 <div className="text-center">
                                     <p className="text-sm text-f1-light-gray">IN</p>
                                     <p className="font-bold text-lg">{t.in.name}</p>
                                 </div>
                               </div>
                               <p className="text-center mt-3 text-f1-light-gray italic">"{t.justification}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
             {view === 'optimizeResult' && transfers.length === 0 && (
                <div className="mb-8 bg-f1-dark-gray/50 p-6 rounded-lg border border-f1-light-gray text-center">
                    <h2 className="text-2xl font-bold mb-2 text-green-400">No Changes Recommended!</h2>
                    <p className="text-f1-light-gray">The AI analysis suggests your current team is well-optimized for the upcoming race.</p>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TeamDisplay team={result.team} />
              </div>
              <div>
                <ChipCard chipAdvice={result.chipAdvice} />
              </div>
            </div>
          </div>
        );
      default:
        return <Home onSuggestNew={handleSuggestNewTeam} onOptimize={() => setView('optimizeForm')} />;
    }
  };

  return (
    <div className="min-h-screen bg-f1-black font-sans">
      <Header />
       {usingMockData && (
        <div className="bg-yellow-500 text-f1-black text-center p-2 font-semibold shadow-lg flex items-center justify-center gap-4 flex-wrap">
          <p>⚠️ Using sample data. Live data could not be fetched.</p>
          <button
            onClick={handleRetryFetch}
            disabled={isRefetching}
            className="bg-f1-black/80 text-white font-bold px-4 py-1 rounded-md text-sm hover:bg-f1-black disabled:bg-gray-700 disabled:cursor-wait transition-colors"
          >
            {isRefetching ? 'Fetching...' : 'Retry Live Data'}
          </button>
        </div>
      )}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
