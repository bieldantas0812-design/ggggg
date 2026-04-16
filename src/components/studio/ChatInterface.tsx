import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  RefreshCw, 
  Trash2, 
  Download, 
  Upload,
  Pin,
  PinOff,
  Wand2,
  ChevronDown,
  ChevronUp,
  Settings2
} from 'lucide-react';
import { sendChatCompletion } from '../../lib/openrouter';
import { getStorage, setStorage, removeStorage } from '../../lib/storage';
import { SYSTEM_PROMPT, QUICK_ACTIONS, TEMPLATES, RESPONSE_MODES } from './constants';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const [pinnedProfile, setPinnedProfile] = React.useState('');
  const [showQuickActions, setShowQuickActions] = React.useState(true);
  const [responseMode, setResponseMode] = React.useState('default');
  const [temperature, setTemperature] = React.useState(0.7);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Load state
  React.useEffect(() => {
    const savedHistory = getStorage<Message[]>('chat_history_model_creator', []);
    if (savedHistory.length > 0) setMessages(savedHistory);
    
    setPinnedProfile(getStorage('pinned_model_profile', ''));
    setResponseMode(getStorage('selected_response_mode', 'default'));
    setTemperature(getStorage('selected_temperature', 0.7));
  }, []);

  // Save history
  React.useEffect(() => {
    setStorage('chat_history_model_creator', messages);
  }, [messages]);

  // Auto scroll
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const apiKey = getStorage('openrouter_api_key', '');
    const model = getStorage('selected_openrouter_model', 'openrouter/free');

    if (!apiKey) {
      setError('Chave da API não configurada. Vá para a aba de configuração.');
      return;
    }

    const newUserMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, newUserMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      // Build system prompt based on mode and pinned profile
      let finalSystemPrompt = SYSTEM_PROMPT;
      
      if (pinnedProfile) {
        finalSystemPrompt += `\n\n[CONTEXTO FIXADO - PERSONAGEM ATUAL]\nO usuário fixou a seguinte personagem. Use-a como base para todas as respostas a menos que instruído o contrário:\n${pinnedProfile}`;
      }

      if (responseMode !== 'default') {
        const modeLabel = RESPONSE_MODES.find(m => m.id === responseMode)?.label;
        finalSystemPrompt += `\n\n[INSTRUÇÃO DE FORMATO]\nO usuário solicitou que a resposta seja estritamente no formato: ${modeLabel}. Adapte sua resposta para focar neste formato.`;
      }

      const apiMessages = [
        { role: 'system', content: finalSystemPrompt },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await sendChatCompletion(apiKey, {
        model: model,
        messages: apiMessages,
        temperature: temperature
      });

      const assistantMsg: Message = { 
        role: 'assistant', 
        content: response.choices[0].message.content 
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error?.message || 'Ocorreu um erro ao comunicar com a IA.');
      // Remove the user message if it failed completely to allow retry easily, or keep it.
      // Keeping it is usually better UX, user can just hit regenerate.
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearHistory = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico?')) {
      setMessages([]);
      removeStorage('chat_history_model_creator');
    }
  };

  const exportChat = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "studio_ia_chat_export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setMessages(imported);
        }
      } catch (err) {
        alert('Arquivo inválido.');
      }
    };
    reader.readAsText(file);
  };

  const pinLastAssistantMessage = () => {
    const lastMsg = [...messages].reverse().find(m => m.role === 'assistant');
    if (lastMsg) {
      setPinnedProfile(lastMsg.content);
      setStorage('pinned_model_profile', lastMsg.content);
    }
  };

  return (
    <div className="flex flex-col h-[800px] max-h-[80vh] bg-[#0c0c0f] border border-border-main rounded-xl overflow-hidden shadow-2xl">
      {/* Header & Tools */}
      <div className="bg-[#121217] border-b border-border-main p-4 flex flex-wrap justify-between items-center gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-accent/20 rounded flex items-center justify-center border border-brand-accent/30">
            <Bot size={16} className="text-brand-accent" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Studio IA</h3>
            <p className="text-[10px] text-brand-secondary">Model Creator & Prompt Gen</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={exportChat} className="p-2 text-brand-secondary hover:text-white hover:bg-white/5 rounded transition-colors" title="Exportar JSON">
            <Download size={14} />
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-brand-secondary hover:text-white hover:bg-white/5 rounded transition-colors" title="Importar JSON">
            <Upload size={14} />
          </button>
          <input type="file" ref={fileInputRef} onChange={importChat} accept=".json" className="hidden" />
          <div className="w-px h-4 bg-border-main mx-1" />
          <button onClick={clearHistory} className="p-2 text-brand-secondary hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Limpar Chat">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Pinned Profile Banner */}
      <AnimatePresence>
        {pinnedProfile && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-accent/10 border-b border-brand-accent/20 p-3 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-2 overflow-hidden">
              <Pin size={14} className="text-brand-accent mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent block mb-1">Personagem Fixada</span>
                <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed">{pinnedProfile}</p>
              </div>
            </div>
            <button 
              onClick={() => { setPinnedProfile(''); removeStorage('pinned_model_profile'); }}
              className="text-brand-secondary hover:text-white shrink-0 p-1"
              title="Desafixar"
            >
              <PinOff size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <Wand2 size={48} className="mb-4 text-brand-accent" />
            <h4 className="text-lg font-bold uppercase tracking-widest mb-2">Inicie a Criação</h4>
            <p className="text-xs max-w-md">Descreva a modelo que deseja criar ou use uma das ações rápidas abaixo.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-white/10' : 'bg-brand-accent/20 border border-brand-accent/30'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-brand-accent" />}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-white/10 text-white rounded-tr-none' 
                    : 'bg-[#1c1c24] border border-border-main text-brand-secondary rounded-tl-none font-mono text-xs'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => copyToClipboard(msg.content)} className="text-[10px] text-brand-secondary hover:text-white flex items-center gap-1">
                      <Copy size={10} /> Copiar
                    </button>
                    {idx === messages.length - 1 && (
                      <>
                        <span className="text-border-main">•</span>
                        <button onClick={pinLastAssistantMessage} className="text-[10px] text-brand-accent hover:text-white flex items-center gap-1">
                          <Pin size={10} /> Fixar como Base
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-brand-accent/20 border border-brand-accent/30">
              <Bot size={14} className="text-brand-accent" />
            </div>
            <div className="bg-[#1c1c24] border border-border-main p-4 rounded-xl rounded-tl-none flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#121217] border-t border-border-main p-4">
        
        {/* Quick Actions Toggle */}
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary hover:text-white flex items-center gap-1"
          >
            {showQuickActions ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            Ações Rápidas & Templates
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary hover:text-white flex items-center gap-1"
          >
            <Settings2 size={12} />
            Avançado
          </button>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 p-3 bg-black/50 border border-border-main rounded-lg grid grid-cols-2 gap-4"
            >
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-secondary block mb-1">Modo de Resposta</label>
                <select 
                  value={responseMode}
                  onChange={(e) => { setResponseMode(e.target.value); setStorage('selected_response_mode', e.target.value); }}
                  className="w-full bg-[#1c1c24] border border-border-main rounded px-2 py-1 text-xs text-white"
                >
                  {RESPONSE_MODES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-secondary block mb-1">Temperatura ({temperature})</label>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={temperature}
                  onChange={(e) => { setTemperature(parseFloat(e.target.value)); setStorage('selected_temperature', parseFloat(e.target.value)); }}
                  className="w-full accent-brand-accent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showQuickActions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 flex flex-wrap gap-2 overflow-hidden"
            >
              {QUICK_ACTIONS.slice(0, 6).map((action, i) => (
                <button
                  key={i}
                  onClick={() => setInput(action)}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] text-brand-secondary hover:text-white transition-colors whitespace-nowrap"
                >
                  {action}
                </button>
              ))}
              {TEMPLATES.slice(0, 4).map((tpl, i) => (
                <button
                  key={`tpl-${i}`}
                  onClick={() => setInput(tpl.prompt)}
                  className="px-2.5 py-1 bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 rounded-full text-[10px] text-brand-accent transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  <Wand2 size={10} /> {tpl.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Descreva a modelo ou a cena que deseja criar... (Shift + Enter para pular linha)"
            className="w-full bg-[#1c1c24] border border-border-main rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none min-h-[60px] max-h-[200px]"
            rows={2}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 w-8 h-8 bg-brand-accent text-white rounded-lg flex items-center justify-center hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={14} className={isLoading ? 'animate-pulse' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
