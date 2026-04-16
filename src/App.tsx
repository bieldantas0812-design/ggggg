import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, QrCode, Wand2 } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import BackgroundRemover from './components/BackgroundRemover';
import QRCodeGenerator from './components/QRCodeGenerator';
import PromptGenerator from './components/PromptGenerator';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SuiteCreatorPro from './components/suite/SuiteCreatorPro';
import StudioIA from './components/studio/StudioIA';
import { cn } from './lib/utils';

type ToolId = 'remover' | 'qrcode' | 'prompt';

export default function App() {
  const [activeTool, setActiveTool] = React.useState<ToolId>('remover');

  const tools = [
    { id: 'remover', label: 'Removedor de Fundo', icon: ImageIcon, color: 'bg-blue-500' },
    { id: 'qrcode', label: 'Gerador de QR Code', icon: QrCode, color: 'bg-purple-500' },
    { id: 'prompt', label: 'Gerador de Prompt', icon: Wand2, color: 'bg-orange-500' },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        {/* Tools Section */}
        <section id="ferramentas" className="pb-12 relative">
          <div className="max-w-7xl mx-auto px-10">
            {/* Tool Switcher / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;
                return (
                  <div
                    key={tool.id}
                    className={cn(
                      "card-premium flex flex-col transition-all",
                      isActive ? "ring-2 ring-brand-accent ring-inset" : "opacity-90"
                    )}
                  >
                    <div className="p-5 border-b border-border-main flex items-center justify-between">
                      <h3 className="text-base font-bold flex items-center gap-2.5">
                        <Icon size={18} className="text-brand-accent" />
                        {tool.label}
                      </h3>
                      {!isActive && (
                        <button 
                          onClick={() => setActiveTool(tool.id)}
                          className="text-[11px] font-bold uppercase tracking-wider text-brand-accent hover:underline"
                        >
                          Selecionar
                        </button>
                      )}
                    </div>
                    
                    <div className="p-5 flex-1">
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.div
                            key={tool.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {tool.id === 'remover' && <BackgroundRemover />}
                            {tool.id === 'qrcode' && <QRCodeGenerator />}
                            {tool.id === 'prompt' && <PromptGenerator />}
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-12 text-center opacity-40">
                            <Icon size={48} className="mb-4" />
                            <p className="text-sm">Clique em selecionar para usar esta ferramenta</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <SuiteCreatorPro />
        <StudioIA />

        <Benefits />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
