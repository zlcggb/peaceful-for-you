import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Phone, ArrowRight } from 'lucide-react';

interface Chapter4Props {
  onComplete: (messages: string[]) => void;
}

const Chapter4: React.FC<Chapter4Props> = ({ onComplete }) => {
  const [foundColleagues, setFoundColleagues] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState('');
  const [sceneRestored, setSceneRestored] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const colleagues = [
    {
      id: 'colleague1',
      position: 'top-1/4 left-1/4',
      name: '小王',
      message: '你女朋友以为你唯唯诺诺？别听她的，我们都知道你平时为了她有多努力。',
      contact: '小王是一个很负责的人，对女朋友更是没得说。我们都希望你们好好的。'
    },
    {
      id: 'colleague2',
      position: 'top-1/4 right-1/4',
      name: '小李',
      message: '你们俩的事情我们都知道，我们都愿意帮你，只要你们能复合。',
      contact: '我愿意当你们的和事佬，随时可以联系我。'
    },
    {
      id: 'colleague3',
      position: 'bottom-1/3 left-1/3',
      name: '小张',
      message: '别想多了，他对我们很好的，他只是嘴笨，但心是好的。希望你给他一次机会。',
      contact: '别想多了，他对我们很好的，他只是嘴笨，但心是好的。希望你给他一次机会。'
    }
  ];

  const handleColleagueClick = (colleague: typeof colleagues[0]) => {
    if (!foundColleagues.includes(colleague.id)) {
      setFoundColleagues([...foundColleagues, colleague.id]);
      setShowDialog(colleague.message);
      
      setTimeout(() => {
        setShowDialog('');
        if (foundColleagues.length + 1 === colleagues.length) {
          setTimeout(() => {
            setSceneRestored(true);
            setTimeout(() => setShowPhone(true), 1000);
          }, 500);
        }
      }, 4000);
    }
  };

  const handlePhoneClick = () => {
    const messages = colleagues.map(c => c.contact);
    setShowNextButton(true);
    setTimeout(() => onComplete(messages), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Office Background */}
      <div className={`absolute inset-0 transition-all duration-2000 ${sceneRestored ? 'filter-none' : 'filter grayscale contrast-50'}`}>
        <div className="w-full h-full bg-gradient-to-b from-blue-200 via-blue-100 to-gray-100">
          {/* Office Desks */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-20 h-12 bg-amber-700 rounded-lg"
              style={{
                left: `${20 + (i % 3) * 30}%`,
                top: `${30 + Math.floor(i / 3) * 25}%`
              }}
            >
              {/* Computer */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gray-800 rounded-sm"></div>
            </div>
          ))}
          
          {/* Office Plants */}
          <div className="absolute top-20 right-10 w-8 h-16 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-8 h-16 bg-green-600 rounded-full"></div>
        </div>
      </div>

      {/* Chapter Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">第四章：同事们的证言</h2>
          </div>
        </div>
      </div>

      {/* Colleague Characters */}
      {colleagues.map((colleague) => (
        <button
          key={colleague.id}
          className={`absolute ${colleague.position} z-10 group ${foundColleagues.includes(colleague.id) ? 'opacity-75' : ''}`}
          onClick={() => handleColleagueClick(colleague)}
          disabled={foundColleagues.includes(colleague.id)}
        >
          <div className="relative">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
              foundColleagues.includes(colleague.id) 
                ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                : 'bg-gradient-to-r from-gray-400 to-gray-600'
            }`}>
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
              {colleague.name}
            </div>
            {!foundColleagues.includes(colleague.id) && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </button>
      ))}

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="bg-black/80 backdrop-blur-sm max-w-2xl w-full p-8 rounded-2xl border border-blue-500/30">
            <div className="flex items-center space-x-4 mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 font-semibold">同事证言</span>
            </div>
            <p className="text-white text-lg leading-relaxed">{showDialog}</p>
          </div>
        </div>
      )}

      {/* Phone (Colleague Messages) */}
      {showPhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="bg-black/90 backdrop-blur-sm max-w-md w-full p-6 rounded-2xl border border-blue-500/30">
            <div className="flex items-center space-x-3 mb-6">
              <Phone className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">来自同事的留言</span>
            </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {colleagues.map((colleague, index) => (
                <div key={index} className="bg-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold">{colleague.name}</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{colleague.contact}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={handlePhoneClick}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
            >
              收到消息
            </button>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showNextButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => onComplete(colleagues.map(c => c.contact))}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>看结局</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-white text-sm">证言收集: {foundColleagues.length}/{colleagues.length}</span>
        </div>
      </div>

      {/* Helper Text */}
      {sceneRestored && !showPhone && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <p className="text-white text-lg mb-4">桌上出现了一个闪光的手机...</p>
            <p className="text-gray-300 text-sm">点击查看同事们的留言</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapter4;