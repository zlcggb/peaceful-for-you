import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Heart, ArrowRight } from 'lucide-react';

interface Chapter1Props {
  onComplete: () => void;
}

const Chapter1: React.FC<Chapter1Props> = ({ onComplete }) => {
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState('');
  const [sceneRestored, setSceneRestored] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const clues = [
    {
      id: 'bench',
      position: 'bottom-20 left-1/4',
      icon: Clock,
      title: '长椅上的等待',
      message: '那天，风真的很大，我提前半小时就到了，但你迟到了。我没有抱怨，只是看着手机，心里想："她快到了吧？"'
    },
    {
      id: 'shadow',
      position: 'top-1/3 right-1/4',
      icon: Heart,
      title: '风中的身影',
      message: '你只记得他催你快点，却忘了他独自在风中等你的焦虑。那是他在乎你的方式。'
    }
  ];

  const handleClueClick = (clue: typeof clues[0]) => {
    if (!foundClues.includes(clue.id)) {
      setFoundClues([...foundClues, clue.id]);
      setShowDialog(clue.message);
      
      setTimeout(() => {
        setShowDialog('');
        if (foundClues.length + 1 === clues.length) {
          setTimeout(() => {
            setSceneRestored(true);
            setTimeout(() => setShowNextButton(true), 2000);
          }, 500);
        }
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - Canton Tower Scene */}
      <div className={`absolute inset-0 transition-all duration-2000 ${sceneRestored ? 'filter-none' : 'filter grayscale contrast-50'}`}>
        <div className="relative w-full h-full bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500">
          {/* Canton Tower Silhouette */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-96 bg-gradient-to-t from-yellow-600 to-yellow-400 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-400 rounded"></div>
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
          
          {/* Wind Effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold text-white">第一章：广州塔的等待</h2>
          </div>
        </div>
      </div>

      {/* Interactive Clues */}
      {clues.map((clue) => (
        <button
          key={clue.id}
          className={`absolute ${clue.position} z-10 group ${foundClues.includes(clue.id) ? 'opacity-50' : ''}`}
          onClick={() => handleClueClick(clue)}
          disabled={foundClues.includes(clue.id)}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <clue.icon className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            {!foundClues.includes(clue.id) && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {clue.title}
              </div>
            )}
          </div>
        </button>
      ))}

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="bg-black/80 backdrop-blur-sm max-w-2xl w-full p-8 rounded-2xl border border-pink-500/30">
            <p className="text-white text-lg leading-relaxed text-center">{showDialog}</p>
          </div>
        </div>
      )}

      {/* Restored Scene Overlay */}
      {sceneRestored && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
            <div className="w-64 h-40 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">💑 一张你们的合照闪现</span>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showNextButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>下一章</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-white text-sm">线索进度: {foundClues.length}/{clues.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;