import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Clock, Users, Sparkles } from 'lucide-react';
import GameIntro from './components/GameIntro';
import Chapter1 from './components/Chapter1';
import Chapter2 from './components/Chapter2';
import Chapter3 from './components/Chapter3';
import Chapter4 from './components/Chapter4';
import GameEnding from './components/GameEnding';

type GameState = 'intro' | 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4' | 'ending';

interface GameProgress {
  chapter1Complete: boolean;
  chapter2Complete: boolean;
  chapter3Complete: boolean;
  chapter4Complete: boolean;
  colleagueMessages: string[];
}

function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [progress, setProgress] = useState<GameProgress>({
    chapter1Complete: false,
    chapter2Complete: false,
    chapter3Complete: false,
    chapter4Complete: false,
    colleagueMessages: []
  });

  const updateProgress = (updates: Partial<GameProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  const nextChapter = () => {
    switch (gameState) {
      case 'intro':
        setGameState('chapter1');
        break;
      case 'chapter1':
        setGameState('chapter2');
        break;
      case 'chapter2':
        setGameState('chapter3');
        break;
      case 'chapter3':
        setGameState('chapter4');
        break;
      case 'chapter4':
        setGameState('ending');
        break;
    }
  };

  const renderCurrentScene = () => {
    switch (gameState) {
      case 'intro':
        return <GameIntro onStart={nextChapter} />;
      case 'chapter1':
        return (
          <Chapter1 
            onComplete={() => {
              updateProgress({ chapter1Complete: true });
              nextChapter();
            }}
          />
        );
      case 'chapter2':
        return (
          <Chapter2 
            onComplete={() => {
              updateProgress({ chapter2Complete: true });
              nextChapter();
            }}
          />
        );
      case 'chapter3':
        return (
          <Chapter3 
            onComplete={() => {
              updateProgress({ chapter3Complete: true });
              nextChapter();
            }}
          />
        );
      case 'chapter4':
        return (
          <Chapter4 
            onComplete={(messages: string[]) => {
              updateProgress({ 
                chapter4Complete: true, 
                colleagueMessages: messages 
              });
              nextChapter();
            }}
          />
        );
      case 'ending':
        return <GameEnding progress={progress} />;
      default:
        return <GameIntro onStart={nextChapter} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Progress Bar */}
      {gameState !== 'intro' && gameState !== 'ending' && (
        <div className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-center py-4 space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className={`w-5 h-5 ${progress.chapter1Complete ? 'text-pink-400' : 'text-gray-500'}`} />
              <span className="text-white text-sm">广州塔</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className={`w-5 h-5 ${progress.chapter2Complete ? 'text-pink-400' : 'text-gray-500'}`} />
              <span className="text-white text-sm">生物岛</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className={`w-5 h-5 ${progress.chapter3Complete ? 'text-pink-400' : 'text-gray-500'}`} />
              <span className="text-white text-sm">图书馆</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className={`w-5 h-5 ${progress.chapter4Complete ? 'text-pink-400' : 'text-gray-500'}`} />
              <span className="text-white text-sm">同事证言</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Game Content */}
      <div className={gameState !== 'intro' && gameState !== 'ending' ? 'pt-20' : ''}>
        {renderCurrentScene()}
      </div>

      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-pink-300/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;