import React from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, RefreshCw, Palette, Settings2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function QRCodeGenerator() {
  const [text, setText] = React.useState('');
  const [qrUrl, setQrUrl] = React.useState('');
  const [colorDark, setColorDark] = React.useState('#000000');
  const [colorLight, setColorLight] = React.useState('#ffffff');
  const [size, setSize] = React.useState(300);
  const [margin, setMargin] = React.useState(2);

  const generateQR = React.useCallback(async () => {
    if (!text) {
      setQrUrl('');
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: margin,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  }, [text, size, margin, colorDark, colorLight]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      generateQR();
    }, 300);
    return () => clearTimeout(timer);
  }, [generateQR]);

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'nexus-tools-qrcode.png';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center p-2 shadow-inner">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="w-full h-full" />
          ) : (
            <QrCode className="text-gray-200" size={48} />
          )}
        </div>
        
        <div className="w-full space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">URL ou Texto</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://seusite.com"
            className="w-full bg-[#1c1c24] border border-border-main rounded-md px-3 py-2 text-xs focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Cor QR</label>
          <div className="flex items-center gap-2 bg-[#1c1c24] border border-border-main rounded-md px-2 py-1.5">
            <input
              type="color"
              value={colorDark}
              onChange={(e) => setColorDark(e.target.value)}
              className="w-6 h-6 rounded bg-transparent border-none cursor-pointer"
            />
            <span className="text-[10px] font-mono opacity-50">{colorDark}</span>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Fundo</label>
          <div className="flex items-center gap-2 bg-[#1c1c24] border border-border-main rounded-md px-2 py-1.5">
            <input
              type="color"
              value={colorLight}
              onChange={(e) => setColorLight(e.target.value)}
              className="w-6 h-6 rounded bg-transparent border-none cursor-pointer"
            />
            <span className="text-[10px] font-mono opacity-50">{colorLight}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          disabled={!qrUrl}
          onClick={downloadQR}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Gerar & Baixar
        </button>
        <button
          onClick={() => {
            setText('');
            setQrUrl('');
          }}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Limpar
        </button>
      </div>
    </div>
  );
}
