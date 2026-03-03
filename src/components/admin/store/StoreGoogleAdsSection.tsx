import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

export default function StoreGoogleAdsSection() {
  const [open, setOpen] = useState(true);

  const steps = [
    { num: "1", title: "Criar conta no Google Ads", desc: "Acesse ads.google.com e crie sua conta gratuita. Você precisará de um e-mail Google e dados de faturamento.", link: "https://ads.google.com" },
    { num: "2", title: "Criar uma campanha de Pesquisa", desc: "Clique em '+ Nova Campanha' → Escolha a meta 'Vendas' ou 'Tráfego do site' → Selecione 'Pesquisa' como tipo de campanha." },
    { num: "3", title: "Definir palavras-chave", desc: "Adicione palavras-chave relacionadas ao seu negócio. Use correspondência de frase para melhor controle." },
    { num: "4", title: "Criar anúncios", desc: "Escreva títulos atrativos (máx. 30 caracteres cada) e descrições (máx. 90 caracteres)." },
    { num: "5", title: "Configurar orçamento", desc: "Defina um orçamento diário (ex: R$ 20-50/dia para começar). Você só paga quando clicam no anúncio (CPC)." },
    { num: "6", title: "Instalar o pixel de conversão", desc: "Copie seu ID do Google Ads (formato AW-XXXXXXXXX) e cole na variável VITE_GOOGLE_ADS_ID nas configurações." },
    { num: "7", title: "Configurar conversões", desc: "No Google Ads, vá em Ferramentas → Conversões → Nova ação de conversão → Website." },
    { num: "8", title: "Vincular Google Analytics (opcional)", desc: "Vincule o Google Analytics 4 ao Google Ads para ver dados mais completos." },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-2" style={{ color: "#1A2B3D" }}>⚡ Status do Pixel Google Ads</h3>
        <div className="flex items-center gap-3">
          {import.meta.env.VITE_GOOGLE_ADS_ID ? (
            <span className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
              <Check className="w-4 h-4" /> Pixel instalado: {import.meta.env.VITE_GOOGLE_ADS_ID}
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
              ⚠️ Pixel não configurado — adicione VITE_GOOGLE_ADS_ID nas variáveis de ambiente
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-lg font-bold w-full text-left" style={{ color: "#1A2B3D" }}>
          {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          📋 Passo a passo para configurar Google Ads
        </button>
        {open && (
          <div className="mt-4 space-y-4">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#2B6CB0" }}>{s.num}</span>
                <div className="flex-1">
                  <h4 className="text-sm font-bold" style={{ color: "#1A2B3D" }}>{s.title}</h4>
                  <p className="text-sm mt-1" style={{ color: "#5A6872" }}>{s.desc}</p>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold mt-1 inline-block" style={{ color: "#2B6CB0" }}>Acessar →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-3" style={{ color: "#1A2B3D" }}>💡 Dicas importantes</h3>
        <ul className="space-y-2 text-sm" style={{ color: "#5A6872" }}>
          <li>• <strong>Comece pequeno:</strong> R$ 20-30/dia é suficiente para testar e aprender.</li>
          <li>• <strong>Segmente por região:</strong> Foque nas cidades/estados onde você entrega.</li>
          <li>• <strong>Use extensões:</strong> Adicione links, telefone e localização nos anúncios.</li>
          <li>• <strong>Monitore diariamente:</strong> Pause palavras-chave que gastam sem converter.</li>
          <li>• <strong>Landing page:</strong> Envie o tráfego para páginas específicas de produtos, não a home.</li>
          <li>• <strong>Remarketing:</strong> Com o pixel instalado, você pode criar campanhas de remarketing.</li>
        </ul>
      </div>
    </div>
  );
}
