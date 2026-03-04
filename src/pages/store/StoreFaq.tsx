import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { StoreCompanyPage } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const FAQ_ARTICLES = [
  { id: 1, title: "Entrega Atrasada", desc: "A maioria dos pacotes chega a tempo. Às vezes, os pedidos são entregues após a data estimada de entrega.", tags: ["Atraso na entrega"] },
  { id: 2, title: "Quando vou receber meu reembolso?", desc: "Quando você devolve um produto, o reembolso é emitido de acordo com a forma de pagamento usada.", tags: ["Estorno"] },
  { id: 3, title: "Cobranças desconhecidas", desc: "Confira motivos comuns para cobranças desconhecidas em sua conta.", tags: ["Cobrança indevida"] },
  { id: 4, title: "Como faço para devolver meu pedido?", desc: "Acesse seus pedidos e clique em devolver produtos para iniciar o processo.", tags: ["Devolução"] },
  { id: 5, title: "Por que não consigo acessar minha conta?", desc: "Caso esteja tendo problemas para fazer login, talvez precise redefinir sua senha.", tags: ["Conta"] },
];

const ALL_TAGS = ["Atraso na entrega", "Estorno", "Cobrança indevida", "Devolução", "Conta"];

const StoreFaq = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = FAQ_ARTICLES.filter((a) => {
    if (selectedTag && !a.tags.includes(selectedTag)) return false;
    if (search) { const q = search.toLowerCase(); return a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q); }
    return true;
  });

  return (
    <StoreCompanyPage>
      {({ cv }) => {
        const companyName = cv('company_name', 'Empresa');
        return (
          <div style={{ backgroundColor: '#f9f9f9' }}>
            <Seo title={`FAQ ${companyName} - Reclame Aqui`} description={`Perguntas frequentes sobre ${companyName}.`} canonicalPath="#" />
            <div className="py-10 px-4 flex flex-col items-center" style={{ backgroundColor: '#eaedf0' }}>
              <h2 className="text-lg md:text-[32px] font-bold text-center mb-2" style={{ color: '#1a1a1a' }}>Precisa de ajuda com {companyName}?</h2>
              <h3 className="text-sm md:text-[21px] font-normal text-center mb-8" style={{ color: '#4B5963' }}>Veja se temos a resposta para o seu problema</h3>
              <div className="w-full max-w-[565px] relative mb-8">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar na FAQ..." className="w-full py-4 px-4 pr-12 rounded text-base" style={{ border: '1px solid #e1e3e5' }} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5" style={{ color: '#1f69c1' }} /></div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-[815px]">
                <button onClick={() => setSelectedTag(null)} className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: !selectedTag ? '#1f69c1' : 'rgba(207,216,244,0.3)', color: !selectedTag ? '#fff' : '#1f69c1' }}>Todos</button>
                {ALL_TAGS.map((tag) => (
                  <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: selectedTag === tag ? '#1f69c1' : 'rgba(207,216,244,0.3)', color: selectedTag === tag ? '#fff' : '#1f69c1' }}>{tag}</button>
                ))}
              </div>
            </div>
            <div className="max-w-[1185px] mx-auto px-4 my-6">
              <div className="bg-white rounded-md" style={{ border: '1px solid #e1e3e5' }}>
                <div className="p-4 md:px-8 md:py-6"><h3 className="text-lg md:text-2xl font-bold" style={{ color: '#4B5963' }}>FAQ {companyName}</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:px-8 md:pb-8">
                  {filtered.length === 0 ? <p className="col-span-full text-center py-12 text-sm" style={{ color: '#4B5963' }}>Nenhum resultado.</p> : filtered.map((a) => (
                    <div key={a.id} className="flex gap-4 rounded-md p-4" style={{ border: '1px solid #e1e3e5' }}>
                      <div className="hidden md:flex flex-none w-[100px] h-[100px] rounded-md items-center justify-center" style={{ background: 'linear-gradient(225deg, rgba(222,240,210,0.6), #96bb1c)' }}>
                        <BookOpen className="w-8 h-8" style={{ color: 'rgba(2,102,52,0.4)' }} />
                      </div>
                      <div className="flex-1 py-2">
                        <h4 className="text-base font-bold mb-2" style={{ color: '#4B5963' }}>{a.title}</h4>
                        <p className="text-sm line-clamp-2" style={{ color: '#4B5963' }}>{a.desc}</p>
                        {a.tags.length > 0 && <div className="flex flex-wrap gap-2 mt-3">{a.tags.map((t) => <span key={t} className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(207,216,244,0.3)', color: '#1f69c1' }}>{t}</span>)}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="max-w-[1185px] mx-auto px-4 pb-10 flex flex-col items-center py-12">
              <h3 className="text-xl font-bold text-center mb-2" style={{ color: '#4B5963' }}>Não encontrou o que precisava?</h3>
              <button className="px-8 py-3 rounded font-semibold text-white text-sm mt-4" style={{ backgroundColor: '#DF2930' }}>Reclamar</button>
            </div>
          </div>
        );
      }}
    </StoreCompanyPage>
  );
};

export default StoreFaq;
