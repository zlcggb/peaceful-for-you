import React, { useState, useEffect } from 'react';
import { BookOpen, Gamepad2, Heart, ArrowRight } from 'lucide-react';

interface Chapter3Props {
  onComplete: () => void;
}

const Chapter3: React.FC<Chapter3Props> = ({ onComplete }) => {
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState('');
  const [sceneRestored, setSceneRestored] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const clues = [
    {
      id: 'library',
      position: 'bottom-32 left-1/4',
      icon: BookOpen,
      title: '图书馆的秘密',
      message: '你只记得他玩游戏，却忘了他为了能和你一起进步，偷偷给你找了那些学习资料。'
    },
    {
      id: 'netcafe',
      position: 'bottom-32 right-1/4',
      icon: Gamepad2,
      title: '网吧的真心',
      message: '他开玩笑说去点女模，让你很生气。但他只是想让你知道，其实他更希望你们能一起玩游戏，一起快乐。'
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
        {/* Left Side - Library */}
        <div className={`w-1/2 relative transition-all duration-2000 ${sceneRestored ? 'filter-none' : 'filter grayscale contrast-75'}`}>
          <div className="w-full h-full bg-gradient-to-b from-amber-100 via-orange-200 to-orange-300">
            {/* Bookshelves */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-16 h-32 bg-amber-800 rounded-lg"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${30 + (i % 2) * 10}%`
                }}
              >
                {/* Books */}
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="w-2 h-20 bg-red-500 rounded-sm absolute top-2"
                    style={{ left: `${2 + j * 2}px` }}
                  ></div>
                ))}
              </div>
            ))}
            
            {/* Study Table */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-4 bg-amber-700 rounded-lg"></div>
              <div className="flex justify-center mt-2">
                <div className="w-6 h-8 bg-pink-400 rounded-full"></div>
              </div>
              <div className="text-center mt-1 text-xs">📚</div>
            </div>
          </div>
        </div>

        {/* Right Side - Internet Cafe */}
        <div className={`w-1/2 relative transition-all duration-2000 ${sceneRestored ? 'filter-none' : 'filter grayscale contrast-75'}`}>
          <div className="w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900">
            {/* Computer Monitors */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-6 bg-gray-800 rounded-sm border border-gray-600"
                style={{
                  left: `${10 + (i % 3) * 25}%`,
                  top: `${30 + Math.floor(i / 3) * 25}%`
                }}
              >
                <div className="w-full h-4 bg-blue-400 rounded-sm opacity-80"></div>
              </div>
            ))}
            
            {/* Gaming Setup */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-8 bg-gray-800 rounded-lg border border-gray-600">
                <div className="w-full h-6 bg-green-400 rounded-sm"></div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="w-6 h-8 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-center mt-1 text-xs">🎮</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">第三章：图书馆与网吧的反差</h2>
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
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
          <div className="bg-black/80 backdrop-blur-sm max-w-2xl w-full p-8 rounded-2xl border border-amber-500/30">
            <p className="text-white text-lg leading-relaxed text-center">{showDialog}</p>
          </div>
        </div>
      )}

      {/* Merged Scene (After Completion) */}
      {sceneRestored && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="bg-gradient-to-r from-amber-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8">
            <div className="w-80 h-48 bg-white/10 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <p className="text-lg">一起学习、一起玩游戏的温馨画面</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showNextButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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

export default Chapter3;