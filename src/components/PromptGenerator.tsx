import React from 'react';
import { Sparkles, Copy, Trash2, Image as ImageIcon, Video, FileText, Megaphone, Check, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Category = 'image' | 'video' | 'text' | 'marketing';

interface PromptField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
}

const CATEGORIES: { id: Category; label: string; icon: any }[] = [
  { id: 'image', label: 'Imagem', icon: ImageIcon },
  { id: 'video', label: 'Vídeo', icon: Video },
  { id: 'text', label: 'Texto', icon: FileText },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
];

const FIELDS: Record<Category, PromptField[]> = {
  image: [
    { id: 'subject', label: 'Assunto Principal', placeholder: 'Ex: Um astronauta em Marte', type: 'text' },
    { id: 'style', label: 'Estilo Artístico', placeholder: 'Selecione um estilo', type: 'select', options: ['Realista', 'Cyberpunk', 'Minimalista', 'Óleo sobre tela', '3D Render', 'Anime', 'Sketch'] },
    { id: 'lighting', label: 'Iluminação', placeholder: 'Ex: Luz cinematográfica, pôr do sol', type: 'text' },
    { id: 'detail', label: 'Nível de Detalhe', placeholder: 'Selecione', type: 'select', options: ['Simples', 'Detalhado', 'Hiper-realista 8k', 'Macro'] },
    { id: 'mood', label: 'Atmosfera/Mood', placeholder: 'Ex: Sombrio, vibrante, nostálgico', type: 'text' },
  ],
  video: [
    { id: 'scene', label: 'Cena/Ação', placeholder: 'Ex: Carro correndo em uma estrada futurista', type: 'text' },
    { id: 'camera', label: 'Movimento de Câmera', placeholder: 'Selecione', type: 'select', options: ['Drone shot', 'Close-up', 'Panning', 'Static', 'Slow motion'] },
    { id: 'atmosphere', label: 'Atmosfera', placeholder: 'Ex: Épico, documental, terror', type: 'text' },
    { id: 'duration', label: 'Duração Sugerida', placeholder: 'Ex: 10 segundos', type: 'text' },
  ],
  text: [
    { id: 'topic', label: 'Tópico/Tema', placeholder: 'Ex: Os benefícios da meditação', type: 'text' },
    { id: 'format', label: 'Formato', placeholder: 'Selecione', type: 'select', options: ['Artigo de Blog', 'Roteiro', 'Poema', 'Resumo Executivo', 'E-mail Profissional'] },
    { id: 'tone', label: 'Tom de Voz', placeholder: 'Selecione', type: 'select', options: ['Formal', 'Casual', 'Persuasivo', 'Humorístico', 'Inspirador'] },
    { id: 'length', label: 'Tamanho', placeholder: 'Ex: 500 palavras', type: 'text' },
  ],
  marketing: [
    { id: 'product', label: 'Produto/Serviço', placeholder: 'Ex: App de produtividade', type: 'text' },
    { id: 'audience', label: 'Público-Alvo', placeholder: 'Ex: Jovens profissionais', type: 'text' },
    { id: 'goal', label: 'Objetivo', placeholder: 'Selecione', type: 'select', options: ['Venda Direta', 'Engajamento', 'Conscientização de Marca', 'Inscrição em Newsletter'] },
    { id: 'platform', label: 'Plataforma', placeholder: 'Selecione', type: 'select', options: ['Instagram', 'LinkedIn', 'Facebook Ads', 'Google Search'] },
  ],
};

export default function PromptGenerator() {
  const [activeCategory, setActiveCategory] = React.useState<Category>('image');
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const generatePrompt = () => {
    let prompt = '';
    const data = formData;

    if (activeCategory === 'image') {
      prompt = `Crie uma imagem de ${data.subject || '[assunto]'}. Estilo: ${data.style || 'não especificado'}. Iluminação: ${data.lighting || 'natural'}. Detalhes: ${data.detail || 'padrão'}. Atmosfera: ${data.mood || 'neutra'}. Alta qualidade, renderização profissional.`;
    } else if (activeCategory === 'video') {
      prompt = `Gere um vídeo de ${data.scene || '[cena]'}. Movimento de câmera: ${data.camera || 'estático'}. Atmosfera: ${data.atmosphere || 'cinematográfica'}. Duração estimada: ${data.duration || 'curta'}. Visual de alta fidelidade.`;
    } else if (activeCategory === 'text') {
      prompt = `Escreva um ${data.format || 'texto'} sobre ${data.topic || '[tópico]'}. O tom deve ser ${data.tone || 'neutro'} e o tamanho aproximado de ${data.length || 'médio'}. Certifique-se de que o conteúdo seja original e envolvente.`;
    } else if (activeCategory === 'marketing') {
      prompt = `Crie uma campanha de marketing para ${data.product || '[produto]'} focada em ${data.audience || '[público]'}. O objetivo principal é ${data.goal || 'conversão'} para a plataforma ${data.platform || 'Redes Sociais'}. Inclua um CTA forte e linguagem persuasiva.`;
    }

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setFormData({});
    setGeneratedPrompt('');
  };

  const generateExample = () => {
    const examples: Record<Category, Record<string, string>> = {
      image: { subject: 'Uma cidade flutuante entre nuvens de neon', style: 'Cyberpunk', lighting: 'Luzes de neon roxas e azuis', detail: 'Hiper-realista 8k', mood: 'Futurista e vibrante' },
      video: { scene: 'Uma baleia saltando de um oceano de estrelas no espaço', camera: 'Drone shot', atmosphere: 'Épico e surreal', duration: '15 segundos' },
      text: { topic: 'O futuro da inteligência artificial na medicina', format: 'Artigo de Blog', tone: 'Inspirador', length: '800 palavras' },
      marketing: { product: 'Um novo café orgânico artesanal', audience: 'Amantes de café e sustentabilidade', goal: 'Engajamento', platform: 'Instagram' },
    };
    setFormData(examples[activeCategory]);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setFormData({});
              setGeneratedPrompt('');
            }}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all",
              activeCategory === cat.id ? "bg-brand-accent text-white" : "bg-white/5 text-brand-secondary hover:bg-white/10"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Tema / Sujeito</label>
          <input
            type="text"
            value={formData.subject || formData.topic || formData.scene || formData.product || ''}
            onChange={(e) => handleInputChange(activeCategory === 'image' ? 'subject' : activeCategory === 'text' ? 'topic' : activeCategory === 'video' ? 'scene' : 'product', e.target.value)}
            placeholder="Ex: Cyberpunk city skyscraper..."
            className="w-full bg-[#1c1c24] border border-border-main rounded-md px-3 py-2 text-xs focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>

        <div className="bg-black border border-border-main rounded-lg p-3 min-h-[100px] max-h-[150px] overflow-y-auto">
          <p className="font-mono text-[11px] text-[#10b981] leading-relaxed">
            {generatedPrompt || 'O prompt gerado aparecerá aqui...'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={generatePrompt}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Wand2 size={16} />
            Gerar Prompt
          </button>
          <button
            disabled={!generatedPrompt}
            onClick={copyToClipboard}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  );
}
