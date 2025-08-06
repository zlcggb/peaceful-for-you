import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Waves, Sparkles } from 'lucide-react';

interface GameEndingProps {
  progress: {
    chapter1Complete: boolean;
    chapter2Complete: boolean;
    chapter3Complete: boolean;
    chapter4Complete: boolean;
    colleagueMessages: string[];
  };
}

const GameEnding: React.FC<GameEndingProps> = ({ progress }) => {
  const [currentScene, setCurrentScene] = useState<'map' | 'beach' | 'confession'>('map');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    
    const mapTimer = setTimeout(() => {
      setCurrentScene('beach');
    }, 4000);
    
    const beachTimer = setTimeout(() => {
      setCurrentScene('confession');
    }, 8000);

    return () => {
      clearTimeout(mapTimer);
      clearTimeout(beachTimer);
    };
  }, []);

  const renderMapScene = () => (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Restored Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
          {/* Map Points */}
          <div className="absolute top-1/4 left-1/4">
            <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm mt-2 block">广州塔</span>
          </div>
          <div className="absolute top-1/3 right-1/4">
            <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm mt-2 block">生物岛</span>
          </div>
          <div className="absolute bottom-1/3 left-1/3">
            <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm mt-2 block">图书馆</span>
          </div>
          <div className="absolute bottom-1/4 right-1/3">
            <div className="w-8 h-8 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm mt-2 block">办公室</span>
          </div>
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 25% 25% Q 50% 15% 75% 33% Q 60% 50% 33% 67% Q 50% 80% 67% 75%"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Overlay Content */}
      <div className={`relative z-10 text-center max-w-2xl mx-auto px-6 transition-all duration-2000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-4xl font-bold text-white mb-6">愈合的地图</h2>
        <p className="text-xl text-gray-200 leading-relaxed mb-8">
          地图上的灰色被完全驱散，每个景点都变得明亮而清晰。
          那条断裂的线，也开始闪闪发光，慢慢愈合。
        </p>
        <div className="flex justify-center space-x-4">
          {[...Array(4)].map((_, i) => (
            <Heart key={i} className="w-8 h-8 text-pink-300 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderBeachScene = () => (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Beach Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-b from-orange-300 via-yellow-200 to-blue-400">
          {/* Sun */}
          <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-80"></div>
          
          {/* Waves */}
          <div className="absolute bottom-0 w-full h-32">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-full h-8 bg-blue-500 rounded-t-full opacity-70"
                style={{
                  bottom: `${i * 6}px`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Characters on Beach */}
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-4">
              <div className="w-12 h-20 bg-pink-400 rounded-full"></div>
              <div className="w-12 h-20 bg-blue-400 rounded-full"></div>
            </div>
            <div className="text-center mt-2 text-2xl">👫</div>
          </div>
          
          {/* Seagulls */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-2xl animate-bounce"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              🕊️
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8">
          <Waves className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-6">深圳的海</h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            还有一个地方，你们一直想去，但没能实现。<br />
            他想和你一起去看深圳的海，<br />
            他想在海边告诉你，他有多么在乎你。
          </p>
        </div>
      </div>
    </div>
  );

  const renderConfessionScene = () => (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Romantic Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-red-900">
          {/* Floating Hearts */}
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-300/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Confession Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-pink-500/30">
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">真心告白</h2>
          </div>
          
          <div className="space-y-6 text-white text-lg leading-relaxed">
            <p>
              我承认，我总是用一些笨拙的玩笑和调侃来表达我的爱，这让你很受伤。我为我的不成熟向你道歉。
            </p>
            
            <p>
              但我想让你知道，我从来都不是一个坏人。我希望你不要只记住那个坏的一面，而忽略了我曾为你付出的努力、我曾为你奔波的距离、以及我们曾一起经历过的所有美好。
            </p>
            
            <p>
              我希望你能看到，我为了你，愿意独自面对黑暗和恐惧。我身边也有很多真心朋友。
            </p>
            
            <div className="text-center py-6">
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} className="w-8 h-8 text-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                ))}
              </div>
            </div>
            
            <p className="text-pink-300 text-xl font-semibold text-center">
              我一直都在这里，等待着你，<br />
              也等待着我们一起去看海的约定。
            </p>
          </div>
          
          {/* Colleague Messages Preview */}
          <div className="mt-8 pt-8 border-t border-pink-500/30">
            <p className="text-gray-300 text-center mb-4">同事们也都在支持我们：</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {progress.colleagueMessages.slice(0, 3).map((message, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-gray-200">{message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (currentScene) {
    case 'map':
      return renderMapScene();
    case 'beach':
      return renderBeachScene();
    case 'confession':
      return renderConfessionScene();
    default:
      return renderMapScene();
  }
};

export default GameEnding;