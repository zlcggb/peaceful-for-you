import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Heart, ArrowRight, Sparkles } from 'lucide-react';

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
      {/* 温暖夕阳风背景 - 广州塔场景 */}
      <div className={`absolute inset-0 scene-transition ${sceneRestored ? 'animate-color-restore' : 'filter grayscale contrast-60 brightness-70'}`}>
        <div className="relative w-full h-full gradient-sunset">
          {/* Sky Details */}
          <div className="absolute inset-0">
            {/* Clouds */}
            <div className="absolute top-20 left-20 w-32 h-16 bg-gray-600/30 rounded-full animate-float"></div>
            <div className="absolute top-32 right-32 w-24 h-12 bg-gray-600/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            
            {/* Stars (visible when restored) */}
            {sceneRestored && [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 30}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Enhanced Canton Tower */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {/* Tower Base */}
            <div className="w-8 h-8 bg-gray-500 rounded-full mb-2"></div>
            
            {/* Main Tower Structure */}
            <div className="w-3 h-96 bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 relative mx-auto">
              {/* Tower Top Light */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full ${sceneRestored ? 'bg-red-400 animate-glow' : 'bg-red-600'}`}></div>
              
              {/* Tower Sections */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-14 h-6 bg-gray-400 rounded opacity-80"></div>
              <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-400 rounded opacity-80"></div>
              <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-18 h-6 bg-gray-400 rounded opacity-80"></div>
              
              {/* Tower Lights */}
              {sceneRestored && [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                  style={{
                    left: `${-2 + Math.random() * 4}px`,
                    top: `${60 + i * 40}px`,
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Tower Reflection */}
            <div className="w-full h-8 bg-gradient-to-t from-yellow-600/20 to-transparent mt-2 blur-sm"></div>
          </div>
          
          {/* Enhanced Wind Effect */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${sceneRestored ? 'bg-white/40' : 'bg-white/20'} animate-ping`}
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 1.5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Ground Details */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-800 to-transparent">
            {/* Bench */}
            <div className="absolute bottom-16 left-1/4 w-16 h-6 bg-amber-800 rounded-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-2 bg-amber-700 rounded-full"></div>
            
            {/* Street Lamp */}
            <div className="absolute bottom-16 right-1/4">
              <div className="w-1 h-20 bg-gray-600 mx-auto"></div>
              <div className={`w-6 h-6 rounded-full mx-auto ${sceneRestored ? 'bg-yellow-300 animate-glow' : 'bg-gray-500'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 响应式章节标题 */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
        <div className="glass-card rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-orange-400"></div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="p-1 sm:p-2 bg-pink-400/20 rounded-full flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-pink-200" />
            </div>
            <h2 className="text-sm sm:text-lg lg:text-2xl font-bold text-white tracking-wide mobile-subtitle">第一章：广州塔的等待</h2>
          </div>
          <div className="hidden sm:block absolute -top-2 -right-2 w-8 h-8 bg-orange-300/20 rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Enhanced Interactive Clues */}
      {clues.map((clue) => (
        <button
          key={clue.id}
          className={`absolute ${clue.position} z-10 group interactive-element ${foundClues.includes(clue.id) ? 'opacity-60' : ''}`}
          onClick={() => handleClueClick(clue)}
          disabled={foundClues.includes(clue.id)}
        >
          <div className="relative">
            {/* Main Clue Button */}
            <div className={`w-18 h-18 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
              foundClues.includes(clue.id) 
                ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 animate-glow'
            }`}>
              <clue.icon className="w-9 h-9 text-white" />
            </div>
            
            {/* Pulse Ring */}
            {!foundClues.includes(clue.id) && (
              <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping"></div>
            )}
            
            {/* Discovery Indicator */}
            <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full transition-all duration-300 ${
              foundClues.includes(clue.id) 
                ? 'bg-green-400 animate-bounce' 
                : 'bg-yellow-400 animate-pulse'
            }`}>
              <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                {foundClues.includes(clue.id) ? '✓' : '!'}
              </span>
            </div>
            
            {/* Enhanced Tooltip */}
            {!foundClues.includes(clue.id) && (
              <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border border-pink-500/30">
                <div className="text-center">
                  <div className="font-semibold text-pink-300">{clue.title}</div>
                  <div className="text-xs text-gray-300 mt-1">点击发现线索</div>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90"></div>
              </div>
            )}
          </div>
        </button>
      ))}

      {/* 梦幻对话框 */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="dialog-box max-w-4xl w-full p-12 rounded-3xl relative overflow-hidden">
            {/* 顶部装饰条 */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400"></div>
            
            {/* 对话框头部 */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="p-3 bg-pink-400/20 rounded-full">
                <Heart className="w-10 h-10 text-pink-200 animate-pulse" />
              </div>
              <span className="text-pink-200 font-medium text-2xl tracking-wide">回忆片段</span>
              <div className="p-3 bg-orange-400/20 rounded-full">
                <Heart className="w-10 h-10 text-orange-200 animate-pulse" />
              </div>
            </div>
            
            {/* 对话内容 */}
            <div className="text-center relative">
              <p className="text-white text-2xl leading-relaxed mb-8 font-light">{showDialog}</p>
              
              {/* 装饰性元素 */}
              <div className="flex justify-center space-x-3 mb-6">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" 
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
              
              {/* 底部装饰 */}
              <div className="flex justify-center space-x-2">
                <Sparkles className="w-5 h-5 text-pink-300 animate-sparkle" />
                <span className="text-pink-200/80 text-sm">那些被遗忘的温柔</span>
                <Sparkles className="w-5 h-5 text-orange-300 animate-sparkle" />
              </div>
            </div>
            
            {/* 背景装饰 */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-300/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-300/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      )}

      {/* Enhanced Restored Scene Overlay */}
      {sceneRestored && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="bg-gradient-to-r from-pink-500/30 to-purple-600/30 backdrop-blur-lg rounded-3xl p-12 border border-pink-400/50 animate-glow">
            <div className="w-80 h-48 bg-white/20 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Photo Frame Effect */}
              <div className="absolute inset-2 border-4 border-white/30 rounded-xl"></div>
              
              {/* Photo Content */}
              <div className="text-center z-10">
                <div className="text-6xl mb-4 animate-float">💑</div>
                <p className="text-white text-lg font-medium">一张你们的合照闪现</p>
                <p className="text-pink-200 text-sm mt-2">那时的笑容，如此真实</p>
              </div>
              
              {/* Sparkle Effects */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              ))}
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