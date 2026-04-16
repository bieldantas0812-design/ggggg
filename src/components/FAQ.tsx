import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'As ferramentas são realmente gratuitas?',
    answer: 'Sim! Nossas ferramentas de QR Code e Gerador de Prompt são 100% gratuitas. O removedor de fundo utiliza uma API externa que pode exigir uma chave própria após o limite de testes.'
  },
  {
    question: 'Preciso criar uma conta para usar?',
    answer: 'Não. O NexusTools foi projetado para ser rápido e acessível. Você pode usar todas as ferramentas sem qualquer tipo de cadastro ou login.'
  },
  {
    question: 'Como funciona o removedor de fundo?',
    answer: 'Utilizamos inteligência artificial avançada para identificar o assunto principal da imagem e isolá-lo do fundo com precisão cirúrgica, entregando um arquivo PNG transparente.'
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Com certeza. Não armazenamos nenhuma imagem ou texto processado em nossos servidores. Tudo é processado e entregue instantaneamente para você.'
  },
  {
    question: 'Posso usar os QR Codes comercialmente?',
    answer: 'Sim, os QR Codes gerados não possuem expiração e podem ser usados livremente em materiais impressos, sites ou campanhas de marketing.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-10">
        <div className="text-center mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Suporte</span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter mb-6 uppercase">Perguntas Frequentes</h2>
          <p className="text-brand-secondary text-sm">
            Tire suas dúvidas sobre o funcionamento da nossa plataforma.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="card-premium overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/[0.04] transition-colors"
              >
                <span className="text-sm font-bold uppercase tracking-tight">{faq.question}</span>
                {openIndex === index ? <Minus size={16} className="text-brand-accent" /> : <Plus size={16} />}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 text-brand-secondary text-xs leading-relaxed border-t border-border-main pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
