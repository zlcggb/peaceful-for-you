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
      {/* 清新海洋风分屏背景 */}
      <div className="absolute inset-0 flex">
        {/* 左侧 - 梦幻生物岛 */}
        <div className={`w-1/2 relative scene-transition ${sceneRestored ? 'animate-color-restore' : 'filter grayscale contrast-75'}`}>
          <div className="w-full h-full gradient-ocean relative overflow-hidden">
            {/* Sky Elements */}
            <div className="absolute top-10 left-10 w-20 h-12 bg-white/40 rounded-full animate-float"></div>
            <div className="absolute top-20 right-16 w-16 h-8 bg-white/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            
            {/* Sun */}
            <div className={`absolute top-12 right-12 w-12 h-12 rounded-full ${sceneRestored ? 'bg-yellow-300 animate-glow' : 'bg-yellow-500'}`}></div>
            
            {/* Enhanced Island */}
            <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-green-700 via-green-600 to-green-500 rounded-t-full">
              {/* Island Texture */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-green-800 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Characters */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-6 items-end">
                <div className="relative">
                  <div className="w-10 h-16 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full"></div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-300 rounded-full"></div>
                </div>
                <div className="relative">
                  <div className="w-10 h-16 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-300 rounded-full"></div>
                </div>
              </div>
              <div className="text-center mt-3 text-2xl animate-float">👫</div>
              {sceneRestored && (
                <div className="text-center mt-2 text-white text-sm font-medium">快乐的时光</div>
              )}
            </div>
            
            {/* Enhanced Trees */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-20"
                style={{
                  left: `${15 + i * 10}%`,
                  bottom: `${25 + Math.random() * 15}%`
                }}
              >
                <div className="w-2 h-12 bg-amber-800"></div>
                <div className="w-6 h-6 bg-green-700 rounded-full -mt-2 mx-auto"></div>
              </div>
            ))}
            
            {/* Bike Path */}
            <div className="absolute bottom-16 left-4 right-4 h-2 bg-yellow-600/50 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Enhanced Dark Road */}
        <div className={`w-1/2 relative scene-transition ${sceneRestored ? 'bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900' : 'bg-gradient-to-b from-gray-900 via-black to-gray-800'}`}>
          {/* Enhanced Road */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-full bg-gradient-to-t from-gray-700 to-gray-600"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-yellow-400 opacity-60"></div>
          
          {/* Road Markings */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-white opacity-40"
              style={{ bottom: `${i * 10}%` }}
            ></div>
          ))}
          
          {/* Scary Elements (before restoration) */}
          {!sceneRestored && (
            <>
              <div className="absolute top-1/3 right-8 w-16 h-20 bg-gray-600 rounded-lg shadow-2xl">
                <div className="w-full h-4 bg-gray-500 rounded-t-lg"></div>
                <div className="text-center text-xs text-red-400 mt-2 font-bold">骨灰屋</div>
                <div className="text-center text-xs text-red-300 mt-1">😰</div>
              </div>
              <div className="absolute top-1/2 left-8 w-16 h-20 bg-gray-600 rounded-lg shadow-2xl">
                <div className="w-full h-4 bg-gray-500 rounded-t-lg"></div>
                <div className="text-center text-xs text-red-400 mt-2 font-bold">骨灰屋</div>
                <div className="text-center text-xs text-red-300 mt-1">😨</div>
              </div>
              
              {/* Spooky Atmosphere */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${30 + Math.random() * 40}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
            </>
          )}
          
          {/* Beautiful Night Scene (after restoration) */}
          {sceneRestored && (
            <>
              {/* Moon */}
              <div className="absolute top-12 right-12 w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full animate-glow">
                <div className="absolute inset-2 bg-yellow-100/30 rounded-full"></div>
              </div>
              
              {/* Moonlight Rays */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-12 right-12 w-1 h-32 bg-yellow-200/20 origin-bottom animate-pulse"
                  style={{
                    transform: `rotate(${-30 + i * 15}deg)`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              ))}
              
              {/* Walking Together */}
              <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-3 items-end">
                  <div className="w-6 h-12 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full"></div>
                  <div className="w-6 h-12 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
                </div>
                <div className="text-center mt-2 text-xl animate-float">👫</div>
                <div className="text-center mt-2 text-purple-200 text-sm font-medium">一起走过黑暗</div>
              </div>
              
              {/* Stars */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* 海洋风章节标题 */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glass-card rounded-2xl px-8 py-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400"></div>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-400/20 rounded-full">
              <Heart className="w-6 h-6 text-blue-200" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">第二章：生物岛的温情与归途的恐惧</h2>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-300/20 rounded-full blur-lg"></div>
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