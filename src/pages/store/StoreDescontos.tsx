import { Tag, ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StoreCompanyPage } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const STEPS = [
  { num: "1", title: "Escolha o cupom", desc: "Navegue pelos cupons disponíveis e escolha o que mais combina com sua compra." },
  { num: "2", title: "Copie o código", desc: "Clique no botão para copiar o código do cupom automaticamente." },
  { num: "3", title: "Aplique no checkout", desc: "Cole o código no campo de cupom na hora de finalizar sua compra." },
];

const StoreDescontos = () => {
  const { storeId } = useParams();

  const { data: coupons } = useQuery({
    queryKey: ["store-coupons", storeId],
    queryFn: async () => {
      const { data, error } = await supabase.from("coupons").select("*").eq("store_id", storeId!).eq("is_active", true);
      if (error) throw error;
      return data || [];
    },
    enabled: !!storeId,
  });

  return (
    <StoreCompanyPage>
      {({ cv }) => {
        const companyName = cv('company_name', 'Empresa');
        const items = coupons || [];
        return (
          <div style={{ backgroundColor: '#f9f9f9' }}>
            <Seo title={`Cupons ${companyName} - Reclame Aqui`} description={`Cupons de desconto de ${companyName}.`} canonicalPath="#" />
            <div className="py-12 px-4" style={{ backgroundColor: '#ebf4f0' }}>
              <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-4xl font-semibold mb-4" style={{ color: '#02793E' }}>Cupons de desconto {companyName}</h1>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5963' }}>Confira os cupons disponíveis e economize em suas compras.</p>
                </div>
                <div className="flex-none bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-4 w-[268px]">
                  <Tag className="w-12 h-12" style={{ color: '#02793E' }} />
                  <p className="text-lg font-normal text-center" style={{ color: '#000' }}><strong>{items.length} cupons</strong> disponíveis</p>
                  {cv('website_url', '') && (
                    <a href={cv('website_url', '#')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-white no-underline" style={{ background: 'linear-gradient(90deg, #90b823, #007535)' }}>
                      <ExternalLink className="w-5 h-5" /> Ir para o site
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="max-w-[1280px] mx-auto px-4 py-8">
              {items.length === 0 ? (
                <p className="text-center text-sm py-12" style={{ color: '#4B5963' }}>Nenhum cupom disponível no momento.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((c) => (
                    <div key={c.id} className="bg-white rounded-lg p-6 flex flex-col items-center text-center gap-3" style={{ boxShadow: '0px 1px 10px rgba(0,0,0,0.12)' }}>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#F1F9E6', color: '#02793E' }}>{c.discount_type}</span>
                      <h3 className="text-xl font-bold" style={{ color: '#000' }}>{c.discount_value}{c.discount_type === 'percentage' ? '%' : 'R$'} OFF</h3>
                      <p className="text-sm" style={{ color: '#4B5963' }}>{c.description}</p>
                      <div className="w-full py-2 px-3 rounded text-sm font-mono text-center tracking-wider" style={{ backgroundColor: '#f9f9f9', border: '1px dashed #E1E3E5', color: '#4B5963' }}>{c.code}</div>
                      <button onClick={() => navigator.clipboard.writeText(c.code)} className="w-full py-2.5 rounded font-semibold text-sm text-white" style={{ background: 'linear-gradient(90deg, #90b823, #007535)' }}>Copiar cupom</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="max-w-[1280px] mx-auto px-4 pb-10">
              <div className="bg-white rounded-lg p-6 md:p-10" style={{ border: '1px solid #E1E3E5' }}>
                <div className="flex items-center gap-2 mb-6"><Tag className="w-5 h-5" style={{ color: '#000' }} /><h2 className="text-lg font-semibold" style={{ color: '#000' }}>Como usar cupons</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {STEPS.map((s) => (
                    <div key={s.num} className="flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: '#02793E' }}>{s.num}</div>
                      <h3 className="text-base font-semibold" style={{ color: '#000' }}>{s.title}</h3>
                      <p className="text-sm" style={{ color: '#4B5963' }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </StoreCompanyPage>
  );
};

export default StoreDescontos;
