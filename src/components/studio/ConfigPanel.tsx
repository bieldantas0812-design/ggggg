import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  MessageSquare, 
  Key, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import { testConnection, fetchModels } from '../../lib/openrouter';
import { getStorage, setStorage, removeStorage } from '../../lib/storage';

interface ConfigPanelProps {
  onConfigComplete: () => void;
}

export default function ConfigPanel({ onConfigComplete }: ConfigPanelProps) {
  const [apiKey, setApiKey] = React.useState('');
  const [showKey, setShowKey] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');
  
  const [models, setModels] = React.useState<any[]>([]);
  const [isLoadingModels, setIsLoadingModels] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState('openrouter/free');

  React.useEffect(() => {
    const savedKey = getStorage<string>('openrouter_api_key', '');
    if (savedKey) {
      setApiKey(savedKey);
      setStatus(getStorage<'idle' | 'testing' | 'success' | 'error'>('openrouter_api_key_status', 'idle'));
      if (getStorage<'idle' | 'testing' | 'success' | 'error'>('openrouter_api_key_status', 'idle') === 'success') {
        loadModels();
      }
    }
    const savedModel = getStorage<string>('selected_openrouter_model', 'openrouter/free');
    setSelectedModel(savedModel);
  }, []);

  const handleSaveAndTest = async () => {
    if (!apiKey.trim()) {
      setStatus('error');
      setMessage('Por favor, insira uma chave de API válida.');
      return;
    }

    setStatus('testing');
    setMessage('Testando conexão com OpenRouter...');

    try {
      await testConnection(apiKey);
      setStatus('success');
      setMessage('Conexão estabelecida com sucesso!');
      setStorage('openrouter_api_key', apiKey);
      setStorage('openrouter_api_key_status', 'success');
      loadModels();
      setTimeout(() => {
        onConfigComplete();
      }, 1500);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.error?.message || 'Falha ao conectar. Verifique sua chave.');
      setStorage('openrouter_api_key_status', 'error');
    }
  };

  const handleRemoveKey = () => {
    removeStorage('openrouter_api_key');
    removeStorage('openrouter_api_key_status');
    setApiKey('');
    setStatus('idle');
    setMessage('');
    setModels([]);
  };

  const loadModels = async () => {
    setIsLoadingModels(true);
    try {
      const data = await fetchModels();
      // Sort to put openrouter/free first, then other free models, then the rest
      const sorted = data.sort((a: any, b: any) => {
        if (a.id === 'openrouter/free') return -1;
        if (b.id === 'openrouter/free') return 1;
        const aIsFree = a.id.includes(':free') || (a.pricing?.prompt === "0" && a.pricing?.completion === "0");
        const bIsFree = b.id.includes(':free') || (b.pricing?.prompt === "0" && b.pricing?.completion === "0");
        if (aIsFree && !bIsFree) return -1;
        if (!aIsFree && bIsFree) return 1;
        return a.name.localeCompare(b.name);
      });
      setModels(sorted);
    } catch (error) {
      console.error('Failed to load models', error);
      // Fallback
      setModels([{ id: 'openrouter/free', name: 'OpenRouter Free (Fallback)' }]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedModel(val);
    setStorage('selected_openrouter_model', val);
  };

  return (
    <div className="card-premium p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent-glow rounded-lg flex items-center justify-center border border-brand-accent/20">
          <Settings className="text-brand-accent" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">Configuração da IA</h3>
          <p className="text-brand-secondary text-xs">Configure sua chave da OpenRouter para usar o Studio IA</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* API Key Input */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary ml-1">
            OpenRouter API Key
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key size={16} className="text-brand-secondary" />
            </div>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full bg-[#1c1c24] border border-border-main rounded-md pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-secondary hover:text-white"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[10px] text-brand-secondary italic flex items-center gap-1">
            <AlertCircle size={10} />
            Sua chave fica salva apenas localmente no seu navegador (localStorage).
          </p>
        </div>

        {/* Status Message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-3 rounded-md text-xs flex items-center gap-2 ${
                status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}
            >
              {status === 'success' && <CheckCircle2 size={14} />}
              {status === 'error' && <XCircle size={14} />}
              {status === 'testing' && <RefreshCw size={14} className="animate-spin" />}
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveAndTest}
            disabled={status === 'testing' || !apiKey}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === 'testing' ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
            Salvar e Testar
          </button>
          {apiKey && (
            <button
              onClick={handleRemoveKey}
              className="btn-secondary px-4 flex items-center justify-center text-red-400 hover:text-red-300 hover:border-red-500/30"
              title="Remover Chave"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Model Selector */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-6 border-t border-border-main space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary ml-1">
                Modelo de IA
              </label>
              <button 
                onClick={loadModels}
                disabled={isLoadingModels}
                className="text-[10px] text-brand-accent hover:underline flex items-center gap-1"
              >
                <RefreshCw size={10} className={isLoadingModels ? "animate-spin" : ""} />
                Atualizar Lista
              </button>
            </div>
            
            <select
              value={selectedModel}
              onChange={handleModelChange}
              disabled={isLoadingModels}
              className="w-full bg-[#1c1c24] border border-border-main rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors appearance-none cursor-pointer"
            >
              {isLoadingModels ? (
                <option>Carregando modelos...</option>
              ) : models.length > 0 ? (
                models.map(m => {
                  const isFree = m.id === 'openrouter/free' || m.id.includes(':free') || (m.pricing?.prompt === "0" && m.pricing?.completion === "0");
                  return (
                    <option key={m.id} value={m.id}>
                      {m.name || m.id} {isFree ? '(Grátis)' : ''}
                    </option>
                  );
                })
              ) : (
                <option value="openrouter/free">openrouter/free (Fallback)</option>
              )}
            </select>
          </motion.div>
        )}
      </div>
    </div>
  );
}
