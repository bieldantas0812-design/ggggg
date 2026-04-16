import { Shield, Zap, Smartphone, Globe, Cloud, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: 'Velocidade Extrema',
      description: 'Processamento em tempo real para que você não perca tempo com esperas desnecessárias.'
    },
    {
      icon: Shield,
      title: 'Privacidade Total',
      description: 'Seus dados e arquivos são processados de forma segura e não são armazenados em nossos servidores.'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Interface totalmente responsiva, otimizada para smartphones, tablets e desktops.'
    },
    {
      icon: Globe,
      title: 'Acesso Global',
      description: 'Ferramentas disponíveis 24/7 em qualquer lugar do mundo, sem necessidade de instalação.'
    },
    {
      icon: Cloud,
      title: 'Sem Cadastro',
      description: 'Use todas as ferramentas instantaneamente sem precisar criar conta ou fazer login.'
    },
    {
      icon: Heart,
      title: 'Grátis para Testar',
      description: 'Funcionalidades principais gratuitas para que você possa focar no que realmente importa: criar.'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 border-y border-border-main">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 block">Diferenciais</span>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter mb-6 uppercase">Por que escolher o NexusHub?</h2>
          <p className="text-brand-secondary max-w-2xl mx-auto text-sm">
            Combinamos tecnologia de ponta com uma experiência de usuário simplificada para entregar resultados profissionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-premium p-8 group"
            >
              <div className="w-10 h-10 bg-accent-glow rounded-lg flex items-center justify-center mb-6 border border-brand-accent/20 group-hover:border-brand-accent/50 transition-colors">
                <benefit.icon className="text-brand-accent" size={20} />
              </div>
              <h3 className="text-lg font-bold mb-3 uppercase tracking-tight">{benefit.title}</h3>
              <p className="text-brand-secondary text-xs leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
