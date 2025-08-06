import React, { useState, useEffect } from 'react';
import { Play, Heart } from 'lucide-react';

interface GameIntroProps {
  onStart: () => void;
}

const GameIntro: React.FC<GameIntroProps> = ({ onStart }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1500);
    const buttonTimer = setTimeout(() => setShowButton(true), 2500);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-gray-600 to-gray-400" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        {/* Game Title */}
        <div className={`transition-all duration-1000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-6">
            灰色的地图
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
            <span className="text-xl text-gray-300">Grey Map</span>
            <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
          </div>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-500 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
            这张地图，曾记录着你们的足迹
          </p>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
            但现在，它被一层灰色的滤镜覆盖，有些记忆变得模糊，有些爱被误解
          </p>
          <p className="text-lg text-pink-300 leading-relaxed mb-12">
            现在，你需要重访这些地方，找回那些被遗忘的真心<br />
            也许，他并不是你以为的那个坏人
          </p>
        </div>

        {/* Start Button */}
        <div className={`transition-all duration-1000 delay-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <span>开始你的回忆之旅</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;