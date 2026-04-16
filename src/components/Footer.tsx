import { Zap, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-border-main pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-sans font-extrabold tracking-tighter uppercase">NexusHub</span>
            </div>
            <p className="text-brand-secondary max-w-sm leading-relaxed text-sm">
              A suíte definitiva de ferramentas criativas para profissionais modernos. 
              Remova fundos, gere QR Codes e crie prompts perfeitos em segundos.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="text-brand-secondary hover:text-brand-accent transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-brand-secondary hover:text-brand-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-brand-secondary hover:text-brand-accent transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Ferramentas</h4>
            <ul className="space-y-4 text-brand-secondary text-xs">
              <li><a href="#remover-fundo" className="hover:text-brand-accent transition-colors">Removedor de Fundo</a></li>
              <li><a href="#qr-code" className="hover:text-brand-accent transition-colors">Gerador de QR Code</a></li>
              <li><a href="#prompt-ai" className="hover:text-brand-accent transition-colors">Gerador de Prompt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Empresa</h4>
            <ul className="space-y-4 text-brand-secondary text-xs">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-main pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-brand-secondary font-bold">
          <p>© 2024 NexusHub. Todos os direitos reservados.</p>
          <p>Design by Geometric Balance</p>
        </div>
      </div>
    </footer>
  );
}
