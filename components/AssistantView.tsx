import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, PRE_DEFINED_QUESTIONS } from '../types';
import { SendIcon, ScaleIcon } from './Icons';

// Utility to parse inline bold formatting: **text**
const parseInlineStyles = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-inherit">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

// Component to render formatted message content
const FormattedMessage: React.FC<{ text: string; role: 'user' | 'model' }> = ({ text, role }) => {
  if (role === 'user') {
    return <p className="whitespace-pre-line text-sm leading-relaxed">{text}</p>;
  }

  const lines = text.split('\n');
  
  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        
        // Skip empty lines in some contexts or render generic spacer
        if (!trimmed) return <div key={index} className="h-2" />;

        // Detect Headers: Starts with ## or is a standalone line wrapped in **
        // Example: **Droit de la famille** or ## Succession
        if (trimmed.startsWith('##') || (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 80)) {
          const content = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
          return (
            <h3 key={index} className="text-actalon-navy font-serif font-bold text-base md:text-lg mt-4 mb-2 first:mt-0">
              {content}
            </h3>
          );
        }

        // Detect Lists: Starts with * or - or 1.
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\./.test(trimmed)) {
          const content = trimmed.replace(/^[\*\-]\s*/, '').replace(/^\d+\.\s*/, '');
          return (
            <div key={index} className="flex items-start ml-1 md:ml-2 mb-1">
              <span className="mt-2 mr-3 w-1.5 h-1.5 rounded-full bg-actalon-gold flex-shrink-0" />
              <p className="text-sm leading-relaxed text-slate-700">
                {parseInlineStyles(content)}
              </p>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={index} className="text-sm leading-relaxed text-slate-700 mb-2">
            {parseInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
};

export const AssistantView: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "**Bonjour.**\n\nJe suis l'assistant virtuel d'Actalon. Je peux répondre à vos questions générales sur :\n* Le droit de la famille (mariage, succession...)\n* Le droit immobilier\n* La gestion de patrimoine\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Désolé, une erreur technique est survenue. Veuillez réessayer plus tard ou contacter directement l'étude.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[800px] w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-actalon-navy p-6 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-actalon-gold/20 rounded-full">
            <ScaleIcon className="w-6 h-6 text-actalon-gold" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold">Assistant Actalon</h2>
            <p className="text-xs text-slate-300">Réponses instantanées 24/7</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] md:max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-actalon-navy text-white rounded-br-none'
                  : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
              }`}
            >
              {/* Use custom renderer instead of direct text */}
              <FormattedMessage text={msg.text} role={msg.role} />
              
              <span className={`text-[10px] mt-2 block opacity-70 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow border border-slate-100 flex items-center space-x-2">
              <div className="w-2 h-2 bg-actalon-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-actalon-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-actalon-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (Mobile/Desktop friendly) */}
      <div className="p-2 bg-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-slate-200">
        <div className="flex space-x-2 px-2">
          {PRE_DEFINED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-4 py-2 bg-white text-slate-600 text-sm rounded-full border border-slate-200 hover:border-actalon-gold hover:text-actalon-gold transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question juridique..."
            disabled={isLoading}
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-actalon-navy/10 focus:border-actalon-navy transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-actalon-navy text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          L'assistant fournit des informations générales. Pour un conseil personnalisé, veuillez prendre rendez-vous.
        </p>
      </div>
    </div>
  );
};