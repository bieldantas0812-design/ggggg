import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Trash2, 
  Wand2, 
  ChevronLeft,
  LayoutGrid,
  Target,
  PenTool,
  BarChart3
} from 'lucide-react';
import { SUITE_TOOLS, ToolConfig, ToolField } from './toolDefinitions';
import { cn } from '../../lib/utils';

const CATEGORIES = [
  { id: 'branding', label: 'Perfil & Branding', icon: LayoutGrid },
  { id: 'sales', label: 'Conversão & Vendas', icon: Target },
  { id: 'content', label: 'Conteúdo & Posicionamento', icon: PenTool },
  { id: 'management', label: 'Gestão', icon: BarChart3 },
];

export default function SuiteCreatorPro() {
  const [activeCategory, setActiveCategory] = React.useState<string>('branding');
  const [selectedTool, setSelectedTool] = React.useState<ToolConfig | null>(null);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<string>('');
  const [copied, setCopied] = React.useState(false);

  const filteredTools = SUITE_TOOLS.filter(t => t.category === activeCategory);

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    // Save to localStorage
    localStorage.setItem(`nexus_tool_${selectedTool?.id}_${id}`, value);
  };

  const handleGenerate = () => {
    if (!selectedTool) return;
    const output = selectedTool.generate(formData);
    setResult(output);
    localStorage.setItem(`nexus_tool_${selectedTool.id}_result`, output);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFormData({});
    setResult('');
    // Clear localStorage for this tool
    selectedTool?.fields.forEach(f => {
      localStorage.removeItem(`nexus_tool_${selectedTool.id}_${f.id}`);
    });
    localStorage.removeItem(`nexus_tool_${selectedTool.id}_result`);
  };

  // Load from localStorage on tool select
  React.useEffect(() => {
    if (selectedTool) {
      const savedData: Record<string, string> = {};
      selectedTool.fields.forEach(f => {
        const val = localStorage.getItem(`nexus_tool_${selectedTool.id}_${f.id}`);
        if (val) savedData[f.id] = val;
      });
      setFormData(savedData);
      setResult(localStorage.getItem(`nexus_tool_${selectedTool.id}_result`) || '');
    }
  }, [selectedTool]);

  return (
    <section id="creator-pro" className="py-24 border-t border-border-main scroll-mt-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest rounded">Pro Expansion</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent">Suite Creator Pro</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter uppercase mb-6">
              Ferramentas de <span className="text-brand-accent">Crescimento</span> Premium
            </h2>
            <p className="text-brand-secondary text-sm leading-relaxed">
              Uma suíte completa de utilitários estratégicos para branding, marketing e conversão. 
              Tudo o que você precisa para profissionalizar sua operação e escalar seus resultados.
            </p>
          </div>
          
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-border-main">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedTool(null);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all",
                    activeCategory === cat.id ? "bg-brand-accent text-white shadow-lg" : "text-brand-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {!selectedTool ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTools.map((tool, idx) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className="card-premium p-8 text-left group hover:border-brand-accent/50 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4">
                      {idx < 3 && (
                        <span className="px-1.5 py-0.5 bg-brand-accent/20 text-brand-accent text-[8px] font-bold uppercase tracking-widest rounded border border-brand-accent/30">Novo</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-accent-glow rounded-lg flex items-center justify-center border border-brand-accent/20 group-hover:border-brand-accent/50 transition-colors">
                        <tool.icon className="text-brand-accent" size={20} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-accent/50 group-hover:text-brand-accent transition-colors">Abrir Ferramenta</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">{tool.name}</h3>
                    <p className="text-brand-secondary text-xs leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="tool"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="card-premium p-0 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row h-full min-h-[500px]">
                  {/* Tool Sidebar / Info */}
                  <div className="w-full lg:w-80 bg-white/[0.02] border-r border-border-main p-8">
                    <button 
                      onClick={() => setSelectedTool(null)}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-secondary hover:text-white mb-8 transition-colors"
                    >
                      <ChevronLeft size={14} />
                      Voltar para a lista
                    </button>
                    
                    <div className="w-12 h-12 bg-accent-glow rounded-xl flex items-center justify-center border border-brand-accent/20 mb-6">
                      <selectedTool.icon className="text-brand-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{selectedTool.name}</h3>
                    <p className="text-brand-secondary text-xs leading-relaxed mb-8">
                      {selectedTool.description}
                    </p>
                    
                    <div className="space-y-4 pt-8 border-t border-border-main">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                        Status: Ativo
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">
                        Categoria: {CATEGORIES.find(c => c.id === selectedTool.category)?.label}
                      </div>
                    </div>
                  </div>

                  {/* Tool Interface */}
                  <div className="flex-1 p-8 lg:p-12">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                      {/* Form */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          {selectedTool.fields.map(field => (
                            <div key={field.id} className="space-y-1.5">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary ml-1">
                                {field.label}
                              </label>
                              {field.type === 'select' ? (
                                <select
                                  value={formData[field.id] || ''}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  className="w-full bg-[#1c1c24] border border-border-main rounded-md px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent transition-colors appearance-none cursor-pointer"
                                >
                                  <option value="" disabled>{field.placeholder || 'Selecione...'}</option>
                                  {field.options?.map(opt => (
                                    <option key={opt} value={opt} className="bg-[#1c1c24]">{opt}</option>
                                  ))}
                                </select>
                              ) : field.type === 'textarea' ? (
                                <textarea
                                  value={formData[field.id] || ''}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  placeholder={field.placeholder}
                                  className="w-full bg-[#1c1c24] border border-border-main rounded-md px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent transition-colors min-h-[100px] resize-none"
                                />
                              ) : (
                                <input
                                  type={field.type}
                                  value={formData[field.id] || ''}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  placeholder={field.placeholder}
                                  className="w-full bg-[#1c1c24] border border-border-main rounded-md px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent transition-colors"
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={handleGenerate}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                          >
                            <Wand2 size={16} />
                            Gerar Resultado
                          </button>
                          <button
                            onClick={handleClear}
                            className="btn-secondary px-4 flex items-center justify-center"
                            title="Limpar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Result */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Resultado Final</span>
                          {result && (
                            <button 
                              onClick={handleCopy}
                              className="text-[10px] font-bold text-brand-accent hover:underline flex items-center gap-1.5"
                            >
                              {copied ? <Check size={12} /> : <Copy size={12} />}
                              {copied ? 'Copiado' : 'Copiar'}
                            </button>
                          )}
                        </div>
                        
                        <div className="bg-black border border-border-main rounded-xl p-6 min-h-[300px] relative overflow-hidden group">
                          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                          
                          {result ? (
                            <div className="relative z-10 font-mono text-xs leading-relaxed text-[#10b981] whitespace-pre-wrap">
                              {result}
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                              <selectedTool.icon size={48} className="mb-4" />
                              <p className="text-xs font-bold uppercase tracking-widest">Aguardando geração...</p>
                            </div>
                          )}
                        </div>
                        
                        {result && (
                          <p className="text-[10px] text-brand-secondary text-center italic">
                            Dica: Você pode editar o texto acima antes de copiar.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
