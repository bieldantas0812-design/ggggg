import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Settings } from 'lucide-react';
import ConfigPanel from './ConfigPanel';
import ChatInterface from './ChatInterface';
import { getStorage } from '../../lib/storage';
import { cn } from '../../lib/utils';

export default function StudioIA() {
  const [activeTab, setActiveTab] = React.useState<'chat' | 'config'>('chat');
  const [isConfigured, setIsConfigured] = React.useState(false);

  React.useEffect(() => {
    const status = getStorage<string>('openrouter_api_key_status', 'idle');
    setIsConfigured(status === 'success');
    if (status !== 'success') {
      setActiveTab('config');
    }
  }, []);

  const handleConfigComplete = () => {
    setIsConfigured(true);
    setActiveTab('chat');
  };

  return (
    <section id="studio-ia" className="py-24 border-t border-border-main scroll-mt-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-1">
                <Sparkles size={10} /> Premium AI
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent">Studio IA</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter uppercase mb-6">
              Criador de <span className="text-brand-accent">Modelos</span> Virtuais
            </h2>
            <p className="text-brand-secondary text-sm leading-relaxed">
              Um ecossistema completo alimentado por IA (via OpenRouter) para criar personagens consistentes, gerar prompts detalhados e manter a identidade visual em múltiplos cenários.
            </p>
          </div>
          
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-border-main">
            <button
              onClick={() => setActiveTab('chat')}
              disabled={!isConfigured}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all",
                activeTab === 'chat' ? "bg-brand-accent text-white shadow-lg" : "text-brand-secondary hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
              )}
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Chat IA</span>
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all",
                activeTab === 'config' ? "bg-brand-accent text-white shadow-lg" : "text-brand-secondary hover:text-white hover:bg-white/5"
              )}
            >
              <Settings size={14} />
              <span className="hidden sm:inline">Configuração</span>
            </button>
          </div>
        </div>

        <div className="relative">
          {activeTab === 'config' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ConfigPanel onConfigComplete={handleConfigComplete} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatInterface />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
