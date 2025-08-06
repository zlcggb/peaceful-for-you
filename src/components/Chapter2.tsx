import React, { useState, useEffect } from 'react';
import { Bike, Moon, Heart, ArrowRight } from 'lucide-react';

interface Chapter2Props {
  onComplete: () => void;
}

const Chapter2: React.FC<Chapter2Props> = ({ onComplete }) => {
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState('');
  const [sceneRestored, setSceneRestored] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const clues = [
    {
      id: 'bike',
      position: 'bottom-32 left-1/4',
      icon: Bike,
      title: '生物岛的快乐',
      message: '我们在这里散步、骑车，你笑得很开心，他也觉得很幸福。'
    },
    {
      id: 'darkness',
      position: 'top-1/3 right-1/4',
      icon: Moon,
      title: '黑暗中的勇气',
      message: '你只看到我们在一起的快乐，却忘了，他为了陪你到这么晚，每次都要一个人走过这条漆黑的路，路边就是骨灰屋。他为了你，在快乐的尽头，独自面对恐惧。'
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
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Split Screen Background */}
      <div className="absolute inset-0 flex">
        {/* Left Side - Biological Island (Bright) */}
        <div className={`w-1/2 relative transition-all duration-2000 ${sceneRestored ? 'filter-none' : 'filter grayscale'}`}>
          <div className="w-full h-full bg-gradient-to-b from-blue-400 via-green-400 to-green-500">
            {/* Island Elements */}
            <div className="absolute bottom-0 w-full h-2/3 bg-green-600 rounded-t-full"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-4">
                <div className="w-8 h-12 bg-pink-400 rounded-full"></div>
                <div className="w-8 h-12 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-center mt-2 text-xs text-white">👫</div>
            </div>
            {/* Trees */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-20 w-4 h-8 bg-green-800 rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  bottom: `${20 + Math.random() * 10}%`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side - Dark Road */}
        <div className={`w-1/2 relative transition-all duration-2000 ${sceneRestored ? 'bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900' : 'bg-gradient-to-b from-gray-900 via-black to-gray-800'}`}>
          {/* Road */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-gray-700"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-400 opacity-50"></div>
          
          {/* Scary Elements (before restoration) */}
          {!sceneRestored && (
            <>
              <div className="absolute top-1/3 right-8 w-12 h-16 bg-gray-600 rounded-lg">
                <div className="text-center text-xs text-red-400 mt-2">骨灰屋</div>
              </div>
              <div className="absolute top-1/2 left-8 w-12 h-16 bg-gray-600 rounded-lg">
                <div className="text-center text-xs text-red-400 mt-2">骨灰屋</div>
              </div>
            </>
          )}
          
          {/* Moonlight (after restoration) */}
          {sceneRestored && (
            <>
              <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-80"></div>
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  <div className="w-4 h-8 bg-pink-400 rounded-full"></div>
                  <div className="w-4 h-8 bg-blue-400 rounded-full"></div>
                </div>
                <div className="text-center mt-1 text-xs text-white">👫</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chapter Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">第二章：生物岛的温情与归途的恐惧</h2>
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
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
          <div className="bg-black/80 backdrop-blur-sm max-w-2xl w-full p-8 rounded-2xl border border-green-500/30">
            <p className="text-white text-lg leading-relaxed text-center">{showDialog}</p>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showNextButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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

export default Chapter2;