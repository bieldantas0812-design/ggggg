import { 
  User, 
  Type, 
  FileText, 
  MousePointer2, 
  MessageSquare, 
  ShieldAlert, 
  Megaphone, 
  TicketPercent, 
  Link2, 
  Instagram, 
  Trophy, 
  Calendar, 
  Camera, 
  Calculator,
  Sparkles
} from 'lucide-react';

export interface ToolField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number';
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
}

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'branding' | 'sales' | 'content' | 'management';
  fields: ToolField[];
  generate: (data: any) => string;
  examples?: any[];
}

export const SUITE_TOOLS: ToolConfig[] = [
  // PERFIL E BRANDING
  {
    id: 'bio-generator',
    name: 'Gerador de Bio Hot',
    description: 'Crie bios magnéticas para perfis de assinatura e redes sociais.',
    icon: User,
    category: 'branding',
    fields: [
      { id: 'platform', label: 'Plataforma', type: 'select', options: ['Instagram', 'X (Twitter)', 'Telegram', 'Página de Assinatura', 'Perfil Reserva'] },
      { id: 'tone', label: 'Tom', type: 'select', options: ['Provocante', 'Premium', 'Misterioso', 'Elegante', 'Direta', 'Delicada'] },
      { id: 'niche', label: 'Nicho / Estilo', type: 'text', placeholder: 'Ex: Fitness, Cosplay, Lifestyle...' },
      { id: 'differential', label: 'Diferencial', type: 'text', placeholder: 'Ex: Conteúdo diário, Chat exclusivo...' },
      { id: 'cta', label: 'CTA Final', type: 'text', placeholder: 'Ex: Link na bio, Vem pro VIP...' }
    ],
    generate: (data) => {
      const { platform, tone, niche, differential, cta } = data;
      return `[Bio para ${platform} - Tom ${tone}]\n\n✨ ${niche || 'Criadora de conteúdo'}\n💎 ${differential || 'Exclusividade e qualidade'}\n🔥 ${cta || 'Clique no link abaixo'}\n\n(Versão 2)\n${tone}: Onde o ${niche || 'estilo'} encontra a perfeição. ${differential || 'Vem ver o que ninguém vê'}. ⬇️ ${cta || 'Link VIP'}`;
    }
  },
  {
    id: 'name-generator',
    name: 'Nomes Artísticos',
    description: 'Encontre o nome perfeito para seu branding pessoal.',
    icon: Type,
    category: 'branding',
    fields: [
      { id: 'style', label: 'Estilo', type: 'select', options: ['Sensual', 'Elegante', 'Luxuoso', 'Gringo', 'Fofo', 'Misterioso', 'Intenso'] },
      { id: 'length', label: 'Tamanho', type: 'select', options: ['Curto', 'Médio', 'Exclusivo'] },
      { id: 'reference', label: 'Referências (opcional)', type: 'text', placeholder: 'Ex: Nomes que você gosta...' }
    ],
    generate: (data) => {
      const names = {
        Sensual: ['Luna Hot', 'Bella Vixen', 'Jade Seduction'],
        Elegante: ['Sophia Rose', 'Isabella Gold', 'Valentina Lux'],
        Luxuoso: ['Diamond Diva', 'Royal Ruby', 'Crystal Queen'],
        Gringo: ['Chloe Wild', 'Amber Sky', 'Lexi Star'],
        Fofo: ['Mimi Sweet', 'Lola Bunny', 'Candy Girl'],
        Misterioso: ['Shadow Muse', 'Night Raven', 'Mystic Maya'],
        Intenso: ['Blaze Fury', 'Stormy Rain', 'Nova Flare']
      };
      const selected = names[data.style as keyof typeof names] || names.Sensual;
      return `Sugestões de Nomes (${data.style}):\n\n1. ${selected[0]}\n2. ${selected[1]}\n3. ${selected[2]}\n\nCombine com sobrenomes como: Moon, Star, Diamond, Velvet, Silk.`;
    }
  },
  {
    id: 'profile-description',
    name: 'Descrições de Perfil',
    description: 'Descrições completas para landing pages e canais VIP.',
    icon: FileText,
    category: 'branding',
    fields: [
      { id: 'platform', label: 'Plataforma', type: 'select', options: ['Telegram VIP', 'Página de Vendas', 'Close Friends', 'Área de Membros'] },
      { id: 'value', label: 'Proposta de Valor', type: 'text', placeholder: 'Ex: O conteúdo mais íntimo e sem censura...' },
      { id: 'content', label: 'Tipo de Conteúdo', type: 'text', placeholder: 'Ex: Fotos, Vídeos, Lives, Chat...' },
      { id: 'positioning', label: 'Posicionamento', type: 'text', placeholder: 'Ex: Exclusivo, Limitado, Premium...' }
    ],
    generate: (data) => {
      return `[Descrição para ${data.platform}]\n\nBem-vindo ao meu espaço ${data.positioning || 'exclusivo'}. Aqui você encontra ${data.content || 'o melhor conteúdo'}. ${data.value || 'Prepare-se para uma experiência única'}.\n\n✅ Conteúdo Diário\n✅ Chat Privado\n✅ Sem Censura\n\nAssine agora e não perca nada!`;
    }
  },

  // CONVERSÃO E VENDAS
  {
    id: 'cta-generator',
    name: 'Gerador de CTA',
    description: 'Chamadas persuasivas para cliques e vendas.',
    icon: MousePointer2,
    category: 'sales',
    fields: [
      { id: 'goal', label: 'Objetivo', type: 'select', options: ['Assinatura', 'Entrar no Canal', 'Chamar na DM', 'Ver Prévia', 'Comprar Pack'] },
      { id: 'tone', label: 'Tom', type: 'select', options: ['Urgente', 'Curioso', 'Provocante', 'Direto'] },
      { id: 'benefit', label: 'Benefício Principal', type: 'text', placeholder: 'Ex: 50% de desconto, Vídeo novo...' }
    ],
    generate: (data) => {
      return `Opções de CTA (${data.goal}):\n\n1. 🔥 [URGENTE] ${data.benefit || 'Não perca'}! Clique aqui agora.\n2. 👀 Quer ver mais? ${data.benefit || 'Vem pro VIP'}.\n3. ⏳ Últimas vagas com ${data.benefit || 'desconto'}. Garanta a sua!\n4. 💌 Me chama na DM para ${data.goal}.`;
    }
  },
  {
    id: 'auto-messages',
    name: 'Mensagens de Venda',
    description: 'Respostas prontas para dúvidas comuns de leads.',
    icon: MessageSquare,
    category: 'sales',
    fields: [
      { id: 'scenario', label: 'Cenário', type: 'select', options: ['Quanto custa?', 'Manda prévia', 'O que tem no VIP?', 'Aceita Pix?', 'Como funciona?'] },
      { id: 'tone', label: 'Tom', type: 'select', options: ['Amigável', 'Profissional', 'Sedutor', 'Rápido'] }
    ],
    generate: (data) => {
      const responses = {
        'Quanto custa?': 'O acesso ao meu canal VIP está apenas R$ XX,XX por mês. É menos que um café por dia para ter acesso a tudo!',
        'Manda prévia': 'As prévias estão disponíveis no meu canal gratuito! Para o conteúdo completo, o link é este: [LINK]',
        'O que tem no VIP?': 'No VIP você tem: Fotos exclusivas, vídeos longos, chat direto comigo e conteúdos que não posto em lugar nenhum!',
        'Aceita Pix?': 'Sim! Aceito Pix para facilitar sua entrada. Me manda o comprovante aqui que te libero na hora!',
        'Como funciona?': 'É super simples: você assina pelo link, recebe o acesso imediato e já pode maratonar tudo!'
      };
      return `[Resposta Sugerida - ${data.scenario}]\n\n${responses[data.scenario as keyof typeof responses] || 'Olá! Como posso te ajudar?'}`;
    }
  },
  {
    id: 'objection-handler',
    name: 'Quebra de Objeções',
    description: 'Respostas estratégicas para converter indecisos.',
    icon: ShieldAlert,
    category: 'sales',
    fields: [
      { id: 'objection', label: 'Objeção', type: 'select', options: ['Tá caro', 'Depois eu vejo', 'Não confio', 'Manda amostra', 'Vou pensar'] },
      { id: 'strategy', label: 'Estratégia', type: 'select', options: ['Valor', 'Exclusividade', 'Urgência', 'Prova Social'] }
    ],
    generate: (data) => {
      return `[Estratégia: ${data.strategy}]\n\nPara a objeção "${data.objection}":\n\n"Entendo perfeitamente, mas lembre-se que este é um investimento na sua diversão e exclusividade. ${data.strategy === 'Urgência' ? 'Essa oferta acaba em poucas horas!' : 'Você terá acesso a conteúdos que valem muito mais que isso.'}"`;
    }
  },
  {
    id: 'ad-generator',
    name: 'Anúncio Canal VIP',
    description: 'Chamadas promocionais para Telegram e Close Friends.',
    icon: Megaphone,
    category: 'sales',
    fields: [
      { id: 'offer', label: 'Oferta', type: 'text', placeholder: 'Ex: Acesso Vitalício, Promoção de Lançamento...' },
      { id: 'price', label: 'Preço', type: 'text', placeholder: 'Ex: R$ 49,90' },
      { id: 'bonus', label: 'Bônus', type: 'text', placeholder: 'Ex: Pack de boas-vindas grátis' }
    ],
    generate: (data) => {
      return `📢 [ANÚNCIO VIP]\n\n${data.offer || 'OFERTA EXCLUSIVA'}!\n\nPor apenas ${data.price || 'um valor especial'}, você garante sua vaga no meu canal mais íntimo.\n\n🎁 BÔNUS: ${data.bonus || 'Conteúdo extra'}\n\n⚠️ Vagas limitadas! Não fique de fora.\n\n🔗 Assine aqui: [LINK]`;
    }
  },
  {
    id: 'promotion-generator',
    name: 'Gerador de Promoções',
    description: 'Campanhas para aumentar sua conversão.',
    icon: TicketPercent,
    category: 'sales',
    fields: [
      { id: 'type', label: 'Tipo de Promoção', type: 'select', options: ['Combo', 'Desconto Temporário', 'Primeira Compra', 'Oferta Relâmpago'] },
      { id: 'benefit', label: 'Benefício', type: 'text', placeholder: 'Ex: Leve 2 pague 1, 30% OFF...' }
    ],
    generate: (data) => {
      return `🔥 [PROMOÇÃO: ${data.type}]\n\nPreparei algo especial: ${data.benefit || 'Um super desconto'}!\n\nVálido apenas para as próximas 24 horas. Aproveite agora para garantir seu acesso com a melhor condição do ano.\n\n👇 Clique no botão abaixo!`;
    }
  },
  {
    id: 'smart-link',
    name: 'Link Inteligente',
    description: 'Links de WhatsApp e Telegram com copy pronta.',
    icon: Link2,
    category: 'sales',
    fields: [
      { id: 'type', label: 'Tipo de Link', type: 'select', options: ['WhatsApp', 'Telegram'] },
      { id: 'phone', label: 'Número/User', type: 'text', placeholder: 'Ex: 5511999999999 ou @seuuser' },
      { id: 'message', label: 'Mensagem Padrão', type: 'text', placeholder: 'Ex: Quero entrar no VIP!' }
    ],
    generate: (data) => {
      const link = data.type === 'WhatsApp' 
        ? `https://wa.me/${data.phone}?text=${encodeURIComponent(data.message)}`
        : `https://t.me/${data.phone?.replace('@', '')}`;
      return `Seu Link Inteligente:\n\n${link}\n\nCopy para o botão:\n"Falar comigo agora 💬"`;
    }
  },

  // CONTEÚDO E POSICIONAMENTO
  {
    id: 'caption-generator',
    name: 'Legendas Estratégicas',
    description: 'Legendas que geram curiosidade e desejo.',
    icon: Instagram,
    category: 'content',
    fields: [
      { id: 'tone', label: 'Tom', type: 'select', options: ['Sensual', 'Misteriosa', 'Dominante', 'Fofa', 'Premium', 'Venda Direta'] },
      { id: 'context', label: 'Contexto', type: 'text', placeholder: 'Ex: Foto no espelho, Noite de festa...' },
      { id: 'length', label: 'Tamanho', type: 'select', options: ['Curta', 'Média', 'Longa'] }
    ],
    generate: (data) => {
      return `[Legenda ${data.tone}]\n\n${data.context || 'Apenas observando...'}. Algumas coisas são melhores quando mantidas em segredo. Quer descobrir o resto? 😉\n\n#lifestyle #exclusivo #premium`;
    }
  },
  {
    id: 'title-generator',
    name: 'Títulos de Conteúdo',
    description: 'Títulos chamativos para teasers e álbuns.',
    icon: Trophy,
    category: 'content',
    fields: [
      { id: 'type', label: 'Tipo', type: 'select', options: ['Teaser', 'Álbum', 'Vídeo', 'Chamada de Venda'] },
      { id: 'theme', label: 'Tema', type: 'text', placeholder: 'Ex: Ensaio de lingerie, Bastidores...' }
    ],
    generate: (data) => {
      return `Sugestões de Títulos (${data.type}):\n\n1. 🔥 O que acontece nos bastidores...\n2. 👀 ${data.theme || 'Exclusivo'}: Você não vai acreditar.\n3. 💎 Edição Limitada: ${data.theme || 'Premium'}.\n4. 🤫 Shhh... Só para quem é VIP.`;
    }
  },
  {
    id: 'script-generator',
    name: 'Roteiros de Conversa',
    description: 'Fluxos de conversa para retenção e vendas.',
    icon: MessageSquare,
    category: 'content',
    fields: [
      { id: 'context', label: 'Contexto', type: 'select', options: ['Primeiro Contato', 'Aquecimento', 'Retorno', 'Oferta'] },
      { id: 'goal', label: 'Objetivo', type: 'text', placeholder: 'Ex: Fazer a primeira venda, Renovar assinatura...' }
    ],
    generate: (data) => {
      return `[Roteiro: ${data.context}]\n\nPasso 1: "Oi! Que bom te ver por aqui..."\nPasso 2: "Estava pensando em postar algo especial hoje..."\nPasso 3: "Você já viu o que tem de novo no canal?"\nPasso 4: [OFERTA] "${data.goal || 'Aproveite agora'}"`;
    }
  },
  {
    id: 'calendar-generator',
    name: 'Calendário Semanal',
    description: 'Ideias de conteúdo para toda a semana.',
    icon: Calendar,
    category: 'content',
    fields: [
      { id: 'style', label: 'Estilo', type: 'select', options: ['Lifestyle', 'Sensual', 'Bastidores', 'Misto'] },
      { id: 'goal', label: 'Objetivo da Semana', type: 'text', placeholder: 'Ex: Lançamento de pack, Engajamento...' }
    ],
    generate: (data) => {
      return `📅 [CALENDÁRIO SEMANAL - ${data.style}]\n\nSeg: Teaser do que vem por aí\nTer: Prova social (feedbacks)\nQua: Enquete interativa\nQui: Oferta relâmpago\nSex: Conteúdo premium (prévia)\nSáb: Lifestyle / Bastidores\nDom: Planejamento / Chat VIP`;
    }
  },
  {
    id: 'photoshoot-prompt',
    name: 'Prompts para Ensaio',
    description: 'Ideias visuais para seus próximos ensaios.',
    icon: Camera,
    category: 'content',
    fields: [
      { id: 'scene', label: 'Cena', type: 'select', options: ['Teaser', 'Selfie', 'Espelho', 'Quarto', 'Luxo', 'Banho', 'Lifestyle'] },
      { id: 'style', label: 'Estilo Visual', type: 'select', options: ['Cinematográfico', 'Natural', 'Vibrant', 'Dark'] }
    ],
    generate: (data) => {
      return `📸 [PROMPT DE ENSAIO: ${data.scene}]\n\nAmbiente: ${data.scene}\nIluminação: ${data.style === 'Cinematográfico' ? 'Luz suave lateral' : 'Luz natural'}\nPose sugerida: Foco no olhar e mistério.\nLook: Elegante e minimalista.\n\nFoco: Branding e Desejo.`;
    }
  },

  // GESTÃO
  {
    id: 'profit-calculator',
    name: 'Calculadora de Lucro',
    description: 'Calcule o lucro real das suas vendas.',
    icon: Calculator,
    category: 'management',
    fields: [
      { id: 'price', label: 'Valor da Oferta (R$)', type: 'number', placeholder: 'Ex: 100' },
      { id: 'fee', label: 'Taxa Plataforma (%)', type: 'number', placeholder: 'Ex: 20' },
      { id: 'ads', label: 'Custo Tráfego/Ads (R$)', type: 'number', placeholder: 'Ex: 500' },
      { id: 'sales', label: 'Qtd Vendas', type: 'number', placeholder: 'Ex: 50' }
    ],
    generate: (data) => {
      const price = Number(data.price) || 0;
      const fee = Number(data.fee) || 0;
      const ads = Number(data.ads) || 0;
      const sales = Number(data.sales) || 0;

      const faturamentoBruto = price * sales;
      const taxaTotal = faturamentoBruto * (fee / 100);
      const lucroLiquido = faturamentoBruto - taxaTotal - ads;
      const margem = faturamentoBruto > 0 ? (lucroLiquido / faturamentoBruto) * 100 : 0;

      return `📊 [RELATÓRIO DE LUCRO]\n\n💰 Faturamento Bruto: R$ ${faturamentoBruto.toFixed(2)}\n💸 Taxas (Plataforma): R$ ${taxaTotal.toFixed(2)}\n📢 Investimento Ads: R$ ${ads.toFixed(2)}\n\n✅ LUCRO LÍQUIDO: R$ ${lucroLiquido.toFixed(2)}\n📈 Margem de Lucro: ${margem.toFixed(1)}%\n👤 Lucro por Cliente: R$ ${(sales > 0 ? lucroLiquido / sales : 0).toFixed(2)}`;
    }
  }
];
