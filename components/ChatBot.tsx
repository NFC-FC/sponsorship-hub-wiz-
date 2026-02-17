
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

// Added config prop to match App.tsx usage and brand the component dynamically
export const ChatBot: React.FC<Props> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: `Welcome! I'm the ${config.sponsorName} Fitness Assistant. Ask me anything about our ${config.courtCount} court Master Plan in ${config.projectCity}.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are an enthusiastic ambassador for ${config.sponsorName} Fitness Courts and the National Fitness Campaign in ${config.projectCity}. You help residents understand the benefits of the 7-minute bodyweight workout, the locations of the ${config.courtCount} new courts being built as part of the ${config.projectName} project, and the vision of the Master Plan. Keep answers concise, inspiring, and professional.`,
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to service. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 h-[450px] glass rounded-2xl flex flex-col shadow-2xl border-white/20">
          <div className="p-4 border-b border-white/10 flex justify-between items-center rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}>
            <span className="font-bold text-white text-sm">Fitness Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-xl max-w-[85%] ${
                  m.role === 'user' ? 'text-white' : 'bg-white/10 text-gray-200'
                }`} style={m.role === 'user' ? { backgroundColor: config.accentColor } : {}}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-500 animate-pulse">Thinking...</div>}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask a question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-orange-500"
              style={{ '--focus-color': config.accentColor } as any}
            />
            <button 
              onClick={sendMessage}
              className="text-white px-3 py-2 rounded-lg font-bold hover:brightness-110"
              style={{ backgroundColor: config.accentColor }}
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
          style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}
        >
          💬
        </button>
      )}
    </div>
  );
};
