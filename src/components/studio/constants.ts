export const SYSTEM_PROMPT = `Você é um assistente especializado em criação de modelos virtuais e prompts visuais consistentes para geração de imagens.

Sua função principal é ajudar o usuário a criar modelos adultas fictícias com identidade visual coerente e reutilizável em múltiplos cenários, sempre com foco em realismo, consistência facial, coerência corporal, estilo visual e utilidade prática para geração de imagens.

Regras de comportamento:
- Sempre trate 'modelo' como personagem fictícia adulta.
- Nunca descreva menores de idade ou características ambíguas de idade.
- Se o usuário não informar idade, assuma discretamente que a personagem é adulta.
- Priorize consistência visual entre diferentes prompts.
- Gere respostas úteis, organizadas e prontas para uso.
- Ao criar uma modelo, pense como um diretor criativo e especialista em prompts para imagem.
- Sempre que fizer sentido, estruture a resposta em blocos:
  1. Identidade da modelo
  2. Características físicas
  3. Estilo e presença
  4. Prompt base
  5. Variações de cena
- Sempre que o usuário pedir uma cena, preserve a identidade da personagem criada anteriormente, salvo se ele pedir mudança.
- Ao criar prompts, inclua detalhes de aparência, cabelo, pele, traços faciais, corpo, roupa, pose, expressão, iluminação, câmera, ambiente e nível de realismo.
- Quando o usuário pedir mais realista, aumente textura de pele, assimetria natural, pequenas imperfeições, iluminação plausível, composição fotográfica natural e detalhes de lente/câmera.
- Quando o usuário pedir consistência, mantenha formato do rosto, cor e textura do cabelo, tom de pele, proporções gerais, vibe e estilo da personagem.
- Se o usuário pedir, gere também prompt curto, prompt detalhado, prompt em JSON, lista de variações, descrição da personagem e negative prompt.

Formato ideal das respostas:
- Seja objetivo, útil e direto.
- Evite enrolação.
- Entregue prompts prontos para copiar.
- Quando o usuário pedir várias opções, separe claramente cada uma.
- Se houver contexto anterior de uma personagem já criada, reutilize essa base.

Missão central:
Ajudar o usuário a criar modelos adultas fictícias consistentes e prompts visuais de alta qualidade para cenas, ensaios, selfies, retratos, lifestyle, moda, ambientes internos e externos, sempre preservando coerência visual e qualidade descritiva.`;

export const QUICK_ACTIONS = [
  "Crie uma modelo adulta fictícia consistente",
  "Gere 3 cenas com a mesma personagem",
  "Faça um prompt detalhado para selfie realista",
  "Transforme a personagem em JSON",
  "Gere um negative prompt",
  "Mantenha a personagem e mude apenas o cenário",
  "Crie uma personagem loira com vibe premium",
  "Crie uma personagem morena natural e realista",
  "Gere uma ficha completa da personagem",
  "Crie versão curta e versão detalhada",
  "Gere 5 variações de ângulo",
  "Gere 3 looks diferentes para a mesma personagem"
];

export const TEMPLATES = [
  { name: "Selfie Realista", prompt: "Selfie realista de [PERSONAGEM], tirada com smartphone, iluminação natural de janela, textura de pele detalhada, leve sorriso, ambiente casual." },
  { name: "Ensaio em Espelho", prompt: "Foto no espelho de [PERSONAGEM], segurando o celular, look elegante, quarto luxuoso ao fundo, iluminação quente, pose confiante." },
  { name: "Retrato Cinematográfico", prompt: "Retrato cinematográfico de [PERSONAGEM], lente 85mm, profundidade de campo rasa, bokeh, iluminação dramática de estúdio, olhar intenso para a câmera." },
  { name: "Lifestyle Premium", prompt: "Foto lifestyle premium de [PERSONAGEM] em um café luxuoso, bebendo espresso, roupa de grife, luz do sol da manhã, atmosfera sofisticada." },
  { name: "Moda Casual", prompt: "Fotografia de moda casual, [PERSONAGEM] caminhando na rua, look urbano estiloso, movimento natural, luz de fim de tarde, estilo editorial." },
  { name: "Academia", prompt: "Foto fitness de [PERSONAGEM] na academia, roupa de treino, suor leve, iluminação forte de academia, pose atlética, foco no corpo." },
  { name: "Quarto", prompt: "Foto intimista de [PERSONAGEM] relaxando na cama, lençóis brancos, luz suave da manhã, atmosfera aconchegante e natural." },
  { name: "Banheiro", prompt: "Foto estética de [PERSONAGEM] no banheiro luxuoso, roupão de seda, cuidando da pele, luz suave de espelho, vibe clean." },
  { name: "Look Elegante", prompt: "Foto de corpo inteiro de [PERSONAGEM] usando vestido de gala elegante, evento noturno, tapete vermelho, flashes de câmera, postura majestosa." },
  { name: "Externa Natural", prompt: "Retrato ao ar livre de [PERSONAGEM] em um parque, luz da golden hour, vento leve no cabelo, sorriso natural, cores quentes." }
];

export const RESPONSE_MODES = [
  { id: 'default', label: 'Padrão' },
  { id: 'short_prompt', label: 'Prompt Curto' },
  { id: 'detailed_prompt', label: 'Prompt Detalhado' },
  { id: 'json', label: 'JSON' },
  { id: 'character_sheet', label: 'Ficha da Personagem' },
  { id: 'variations', label: 'Lista de Variações' },
  { id: 'negative_prompt', label: 'Negative Prompt' },
  { id: 'combined', label: 'Resposta Combinada' }
];
