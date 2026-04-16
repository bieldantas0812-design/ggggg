import React from 'react';
import { Upload, Image as ImageIcon, Trash2, Download, Loader2, Key, Sparkles } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function BackgroundRemover() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [apiKey, setApiKey] = React.useState('');
  const [showKeyInput, setShowKeyInput] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('O arquivo deve ter menos de 5MB');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const removeBackground = async () => {
    if (!file) return;
    if (!apiKey) {
      setError('Por favor, insira uma chave de API válida.');
      setShowKeyInput(true);
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': apiKey,
        },
        responseType: 'blob',
      });

      const url = URL.createObjectURL(response.data);
      setResult(url);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.status === 403 
          ? 'Chave de API inválida ou sem créditos.' 
          : 'Ocorreu um erro ao processar a imagem. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Configuração da API</span>
          <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-[10px] font-bold text-brand-accent hover:underline"
          >
            {showKeyInput ? 'Fechar' : 'Alterar Chave'}
          </button>
        </div>
        
        <AnimatePresence>
          {showKeyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-3 rounded-lg bg-white/5 border border-border-main">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="API Key (remove.bg)"
                  className="w-full bg-transparent border border-border-main rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <div 
          className={cn(
            "relative h-[140px] rounded-xl border border-dashed transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer",
            preview ? "border-brand-accent/50 bg-brand-accent/5" : "border-border-main bg-white/[0.02] hover:bg-white/[0.04]"
          )}
        >
          {preview ? (
            <div className="relative w-full h-full">
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              <button 
                onClick={clear}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <>
              <span className="text-xs font-medium text-brand-secondary">Arraste sua imagem aqui</span>
              <small className="text-[10px] opacity-50 mt-1">PNG ou JPG até 5MB</small>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={!file || loading}
            onClick={removeBackground}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? 'Processando' : 'Remover Fundo'}
          </button>
          
          <button
            disabled={!result}
            onClick={() => {
              const link = document.createElement('a');
              link.href = result!;
              link.download = 'nexus-tools-no-bg.png';
              link.click();
            }}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Baixar
          </button>
        </div>
      </div>

      {result && (
        <div className="aspect-video rounded-xl border border-border-main bg-white/[0.02] flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
          <img src={result} alt="Result" className="max-w-full max-h-full object-contain relative z-10" />
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] text-center">
          {error}
        </div>
      )}
    </div>
  );
}
