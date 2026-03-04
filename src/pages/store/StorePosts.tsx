import { ArrowRight } from "lucide-react";
import { StoreCompanyPage, SidebarSection } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const POSTS = [
  { title: "Proteja-se contra fraudes e golpes", desc: "Se você recebeu uma mensagem sobre um pedido inesperado ou atividade não autorizada...", date: "24 de março de 2025", image: "/images/post-fraudes.jpg" },
  { title: "Como funciona a entrega?", desc: "Contamos com centros de distribuição para garantir entregas rápidas e seguras.", date: "10 de janeiro de 2025", image: "/images/post-entrega.jpg" },
  { title: "Política de reembolsos", desc: "Saiba como funcionam os reembolsos, prazos e condições para devolução.", date: "5 de fevereiro de 2025", image: "/images/post-reembolsos.jpg" },
];

const StorePosts = () => (
  <StoreCompanyPage>
    {({ cv }) => {
      const companyName = cv('company_name', 'Empresa');
      return (
        <>
          <Seo title={`Posts de ${companyName} - Reclame Aqui`} description={`Posts de ${companyName}.`} canonicalPath="#" />
          <div className="hidden lg:grid grid-cols-[1fr_280px] gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#000' }}>O que {companyName} está postando</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {POSTS.map((post, i) => (
                  <a key={i} href="#" className="flex flex-col bg-white rounded overflow-hidden no-underline" style={{ border: '1px solid #e1e3e5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
                    <div className="w-full h-[160px] overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover" /></div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <span className="text-xs font-medium" style={{ color: '#A9B0B5' }}>{post.date}</span>
                      <h4 className="text-base font-semibold" style={{ color: '#191B1A' }}>{post.title}</h4>
                      <p className="text-sm line-clamp-2" style={{ color: '#4B5963' }}>{post.desc}</p>
                      <div className="flex items-center gap-1 mt-auto pt-2"><span className="text-sm font-semibold" style={{ color: '#1F69C1' }}>Ler mais</span><ArrowRight className="w-4 h-4" style={{ color: '#1F69C1' }} /></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <SidebarSection cv={cv} />
          </div>
          <div className="lg:hidden">
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#000' }}>O que {companyName} está postando</h3>
            <div className="grid grid-cols-1 gap-4">
              {POSTS.map((post, i) => (
                <a key={i} href="#" className="flex flex-col bg-white rounded overflow-hidden no-underline" style={{ border: '1px solid #e1e3e5' }}>
                  <div className="w-full h-[160px] overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover" /></div>
                  <div className="p-4 flex flex-col gap-2">
                    <span className="text-xs" style={{ color: '#A9B0B5' }}>{post.date}</span>
                    <h4 className="text-base font-semibold" style={{ color: '#191B1A' }}>{post.title}</h4>
                    <p className="text-sm line-clamp-2" style={{ color: '#4B5963' }}>{post.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      );
    }}
  </StoreCompanyPage>
);

export default StorePosts;
