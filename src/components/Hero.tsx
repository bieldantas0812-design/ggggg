import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-accent-glow text-brand-accent rounded-full mb-6">
            <span className="text-[11px] font-bold tracking-wider uppercase">All-in-one Toolkit</span>
          </div>
          
          <h1 className="text-3xl md:text-[32px] font-sans font-extrabold tracking-tight mb-4 leading-tight">
            Sua suíte de ferramentas modernas.
          </h1>
          
          <p className="text-base text-brand-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Potencialize seu workflow com utilitários inteligentes e rápidos. Sem logins, sem complicações, 100% focado em produtividade.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ferramentas"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Explorar Ferramentas
              <ArrowRight size={18} />
            </a>
            <a
              href="#como-funciona"
              className="btn-secondary w-full sm:w-auto"
            >
              Como Funciona
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-10"
        >
          {[
            { label: 'Ferramentas', value: '3+' },
            { label: 'Tempo Médio', value: '< 2s' },
            { label: 'Usuários Felizes', value: '10k+' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-brand-secondary uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
