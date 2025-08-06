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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EC4899' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-13.807-11.193-25-25-25s-25 11.193-25 25 11.193 25 25 25 25-11.193 25-25zm25 0c0-13.807-11.193-25-25-25s-25 11.193-25 25 11.193 25 25 25 25-11.193 25-25z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               animation: 'float 8s ease-in-out infinite'
             }}>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      {gameState !== 'intro' && gameState !== 'ending' && (
        <div className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-pink-500/20">
          <div className="flex items-center justify-center py-5 space-x-8">
            <div className="flex items-center space-x-3 group">
              <div className={`progress-dot w-6 h-6 rounded-full flex items-center justify-center ${progress.chapter1Complete ? 'active' : 'bg-gray-600'}`}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors ${progress.chapter1Complete ? 'text-pink-300' : 'text-gray-400'}`}>广州塔</span>
            </div>
            
            <div className="flex items-center space-x-3 group">
              <div className={`progress-dot w-6 h-6 rounded-full flex items-center justify-center ${progress.chapter2Complete ? 'active' : 'bg-gray-600'}`}>
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors ${progress.chapter2Complete ? 'text-green-300' : 'text-gray-400'}`}>生物岛</span>
            </div>
            
            <div className="flex items-center space-x-3 group">
              <div className={`progress-dot w-6 h-6 rounded-full flex items-center justify-center ${progress.chapter3Complete ? 'active' : 'bg-gray-600'}`}>
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors ${progress.chapter3Complete ? 'text-amber-300' : 'text-gray-400'}`}>图书馆</span>
            </div>
            
            <div className="flex items-center space-x-3 group">
              <div className={`progress-dot w-6 h-6 rounded-full flex items-center justify-center ${progress.chapter4Complete ? 'active' : 'bg-gray-600'}`}>
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors ${progress.chapter4Complete ? 'text-blue-300' : 'text-gray-400'}`}>同事证言</span>
            </div>
          </div>
          
          {/* Progress Line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-1000"
              style={{ 
                width: `${(Object.values(progress).filter(v => typeof v === 'boolean' && v).length / 4) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Game Content */}
      <div className={gameState !== 'intro' && gameState !== 'ending' ? 'pt-24' : ''}>
        {renderCurrentScene()}
      </div>

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Hearts */}
        {[...Array(8)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-pink-300/20 particle-heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          />
        ))}
        
        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute text-purple-300/25 particle-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              fontSize: `${8 + Math.random() * 6}px`
            }}
          />
        ))}
        
        {/* Map Pins */}
        {[...Array(4)].map((_, i) => (
          <MapPin
            key={`pin-${i}`}
            className="absolute text-indigo-300/15 animate-float"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + Math.random() * 40}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${5 + Math.random() * 2}s`,
              fontSize: `${10 + Math.random() * 4}px`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;