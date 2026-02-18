import { Tag, ExternalLink } from "lucide-react";
import { CompanyPage } from "@/components/CompanyLayout";

const COUPONS = [
  { id: 1, title: "Frete Grátis", desc: "Em compras acima de R$ 129 para membros Prime", code: "FRETEPRIME", type: "Frete" },
  { id: 2, title: "10% OFF", desc: "Na primeira compra pelo app Amazon", code: "APP10", type: "Desconto" },
  { id: 3, title: "R$ 30 OFF", desc: "Em eletrônicos selecionados acima de R$ 300", code: "ELETRO30", type: "Desconto" },
  { id: 4, title: "15% OFF", desc: "Em livros e eBooks Kindle", code: "LIVROS15", type: "Desconto" },
];

const STEPS = [
  { num: "1", title: "Escolha o cupom", desc: "Navegue pelos cupons disponíveis e escolha o que mais combina com sua compra." },
  { num: "2", title: "Copie o código", desc: "Clique no botão para copiar o código do cupom automaticamente." },
  { num: "3", title: "Aplique no checkout", desc: "Cole o código no campo de cupom na hora de finalizar sua compra no site da empresa." },
];

const DescontosPage = () => (
  <CompanyPage>
    {({ cv }) => {
      const companyName = cv('company_name', 'Amazon');
      return (
        <div style={{ backgroundColor: '#f9f9f9' }}>
          {/* Hero */}
          <div className="py-12 md:py-16 px-4" style={{ backgroundColor: '#ebf4f0' }}>
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-8" style={{ color: '#02793E', lineHeight: 1.1 }}>
                  Cupons de desconto {companyName}
                </h1>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#4B5963' }}>
                  Não perca nenhum cupom de desconto {companyName}. Aqui você encontra as melhores ofertas com a segurança do Reclame AQUI!
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5963' }}>
                  Confira abaixo os cupons disponíveis e economize em suas compras.
                </p>
              </div>
              <div className="flex-none">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col items-center gap-4 w-[268px]">
                  <Tag className="w-12 h-12" style={{ color: '#02793E' }} />
                  <p className="text-lg font-normal text-center" style={{ color: '#000' }}>
                    <strong>{COUPONS.length} cupons</strong> disponíveis
                  </p>
                  <a
                    href={cv('website_url', 'https://www.amazon.com.br')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-lg text-white no-underline"
                    style={{ background: 'linear-gradient(90deg, #90b823 0%, #007535 100%)' }}
                  >
                    <ExternalLink className="w-5 h-5" /> Ir para o site
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Coupons grid */}
          <div className="max-w-[1280px] mx-auto px-4 py-8">
            <div className="mb-6 text-center">
              <h2 className="text-lg font-semibold" style={{ color: '#000' }}>
                Cupons e ofertas {companyName}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COUPONS.map((coupon) => (
                <div
                  key={coupon.id}
                  className="bg-white rounded-lg p-6 flex flex-col items-center text-center gap-3"
                  style={{ boxShadow: '0px 1px 10px rgba(0,0,0,0.12)' }}
                >
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: coupon.type === 'Frete' ? '#E5EEFB' : '#F1F9E6',
                      color: coupon.type === 'Frete' ? '#1F69C1' : '#02793E',
                    }}
                  >
                    {coupon.type}
                  </span>
                  <h3 className="text-xl font-bold" style={{ color: '#000' }}>{coupon.title}</h3>
                  <p className="text-sm" style={{ color: '#4B5963' }}>{coupon.desc}</p>
                  <div
                    className="w-full py-2 px-3 rounded text-sm font-mono text-center tracking-wider"
                    style={{ backgroundColor: '#f9f9f9', border: '1px dashed #E1E3E5', color: '#4B5963' }}
                  >
                    {coupon.code}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(coupon.code)}
                    className="w-full py-2.5 rounded font-semibold text-sm text-white cursor-pointer"
                    style={{ background: 'linear-gradient(90deg, #90b823 0%, #007535 100%)', border: 'none' }}
                  >
                    Copiar cupom
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How to use */}
          <div className="max-w-[1280px] mx-auto px-4 pb-10">
            <div className="bg-white rounded-lg p-6 md:p-10" style={{ border: '1px solid #E1E3E5' }}>
              <div className="flex items-center gap-2 mb-6">
                <Tag className="w-5 h-5" style={{ color: '#000' }} />
                <h2 className="text-lg font-semibold" style={{ color: '#000' }}>Como usar cupons de desconto</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS.map((step) => (
                  <div key={step.num} className="flex flex-col gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                      style={{ backgroundColor: '#02793E' }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-base font-semibold" style={{ color: '#000' }}>{step.title}</h3>
                    <p className="text-sm" style={{ color: '#4B5963' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </CompanyPage>
);

export default DescontosPage;
