import React, { useState, useEffect } from 'react';
import { Play, Heart, Sparkles, MapPin } from 'lucide-react';

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
      {/* 被灰色滤镜覆盖的世界 */}
      <div className="absolute inset-0">
        {/* 原本彩色的背景 - 被灰色滤镜覆盖 */}
        <div className="w-full h-full bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 filter grayscale contrast-75 brightness-90">
          {/* 灰色滤镜层 */}
          <div className="absolute inset-0 bg-gray-500/20"></div>
          
          {/* 被遮蔽的光效 */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-300/40 to-purple-300/40 rounded-full blur-3xl animate-pulse filter grayscale"></div>
            <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse filter grayscale" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-300/40 to-indigo-300/40 rounded-full blur-3xl animate-pulse filter grayscale" style={{ animationDelay: '4s' }}></div>
          </div>
          
          {/* 地图网格纹理 - 更明显 */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23374151' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3Cpath d='M0 25h100M0 75h100M25 0v100M75 0v100'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                   animation: 'float 20s ease-in-out infinite'
                 }}>
            </div>
          </div>
          
          {/* 失去色彩的地图标记点 */}
          <div className="absolute inset-0">
            {/* 广州塔 - 失去光芒 */}
            <div className="absolute top-1/4 left-1/4 bg-gray-400/20 backdrop-blur-sm rounded-full p-4 border border-gray-400/30">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            {/* 生物岛 - 失去生机 */}
            <div className="absolute top-1/3 right-1/4 bg-gray-400/20 backdrop-blur-sm rounded-full p-4 border border-gray-400/30" style={{ animationDelay: '1s' }}>
              <Heart className="w-5 h-5 text-gray-600" />
            </div>
            {/* 图书馆 - 失去知识的光芒 */}
            <div className="absolute bottom-1/3 left-1/3 bg-gray-400/20 backdrop-blur-sm rounded-full p-4 border border-gray-400/30" style={{ animationDelay: '2s' }}>
              <div className="w-5 h-5 bg-gray-600 rounded-sm opacity-60"></div>
            </div>
            {/* 办公室 - 失去人情味 */}
            <div className="absolute bottom-1/4 right-1/3 bg-gray-400/20 backdrop-blur-sm rounded-full p-4 border border-gray-400/30" style={{ animationDelay: '3s' }}>
              <div className="w-5 h-5 bg-gray-600 rounded-full opacity-60"></div>
            </div>
          </div>
          
          {/* 飘散的灰色记忆碎片 */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${10 + Math.random() * 5}s`
                }}
              >
                <div className="w-1 h-1 bg-gray-500/40 rounded-full blur-sm"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 整体灰色滤镜覆盖层 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 via-slate-500/15 to-gray-700/10 backdrop-blur-[0.5px]"></div>
      </div>

      {/* 响应式内容布局 */}
      <div className="text-center z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* 主标题 - 响应式设计 */}
        <div className={`transition-all duration-1000 ease-out ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-thin text-gray-800 mb-4 sm:mb-6 tracking-tight relative mobile-title" 
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
            灰色的地图
          </h1>
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12 lg:mb-20">
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-light tracking-wider">Grey Map</span>
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* 响应式内容区域 */}
        <div className={`transition-all duration-1000 delay-300 ease-out ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 lg:mb-12 relative overflow-hidden backdrop-blur-xl mobile-spacing">
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 leading-relaxed font-light mobile-subtitle">
                这张地图，曾记录着你们的足迹
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-4xl mx-auto mobile-text">
                但现在，它被一层灰色的滤镜覆盖，有些记忆变得模糊，有些爱被误解
              </p>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 pt-2 sm:pt-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed font-medium mobile-text">
                  现在，你需要重访这些地方，找回那些被遗忘的真心
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-rose-600 leading-relaxed font-medium mobile-text">
                  也许，他并不是你以为的那个坏人
                </p>
              </div>
            </div>
            
            {/* 装饰元素 - 手机端隐藏 */}
            <div className="hidden sm:block absolute top-6 right-6 w-3 h-3 bg-gray-300/50 rounded-full animate-pulse"></div>
            <div className="hidden sm:block absolute bottom-6 left-6 w-2 h-2 bg-gray-400/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* 底部装饰线 */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* 响应式按钮 */}
        <div className={`transition-all duration-1000 delay-600 ease-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={onStart}
            className="group relative px-6 sm:px-8 lg:px-12 py-4 sm:py-5 glass-card text-gray-800 font-medium rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out backdrop-blur-xl border border-gray-200/50 interactive-element mobile-button w-full sm:w-auto"
            style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
          >
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              <span>开始你的回忆之旅</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            
            {/* 玻璃质感光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
          
          {/* 简洁的提示文字 */}
          <p className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6 lg:mt-8 font-light mobile-text">
            点击开始，重新发现那些被遗忘的美好
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;