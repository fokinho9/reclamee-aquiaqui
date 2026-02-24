import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { CompanyPage } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const FAQ_ARTICLES = [
  {
    id: 1,
    title: "Entrega Atrasada",
    desc: "A maioria dos pacotes chega a tempo. Às vezes, os pedidos são entregues após a data estimada de entrega. Possíveis razões para o atraso na entrega incluem condições climáticas e alta demanda.",
    tags: ["Atraso na entrega", "Produto não recebido"],
    hasImage: true,
  },
  {
    id: 2,
    title: "Quando vou receber meu reembolso?",
    desc: "Quando você devolve um produto enviado pela Agro Brasil, o reembolso é emitido de acordo com a forma de pagamento usada no momento da compra. O prazo pode variar conforme o método.",
    tags: ["Estorno do valor pago"],
    hasImage: true,
  },
  {
    id: 3,
    title: "Cobranças desconhecidas",
    desc: "Confira a seguir alguns motivos comuns para cobranças desconhecidas: Um pedido foi feito por um membro da família, amigo ou colega de trabalho com acesso ao seu dispositivo.",
    tags: ["Cobrança indevida"],
    hasImage: true,
  },
  {
    id: 4,
    title: "Cancelar sua assinatura",
    desc: "Você pode cancelar sua assinatura em Gerenciar sua assinatura. Você pode estar qualificado para um reembolso se seus benefícios ainda não foram usados.",
    tags: ["Cancelamento da conta"],
    hasImage: true,
  },
  {
    id: 5,
    title: "Como faço para devolver meu pedido?",
    desc: "Para pedidos vendidos e enviados pela Agro Brasil, acesse os Seus Pedidos. Acesse o pedido que deseja devolver e clique em \"Devolver produtos\".",
    tags: ["Troca-Devolução de produto"],
    hasImage: true,
  },
  {
    id: 6,
    title: "Dispositivos Agro Brasil",
    desc: "Se você precisar de ajuda com os dispositivos Agro Brasil, contate o Serviço de Atendimento ao Cliente da Agro Brasil.",
    tags: [],
    hasImage: false,
  },
  {
    id: 7,
    title: "Como comprar de um vendedor",
    desc: "Os vendedores são independentes e oferecem uma variedade de itens novos e usados. As etapas para fazer um pedido a um vendedor são as mesmas usadas para fazer qualquer outro pedido.",
    tags: ["Dificuldade para concluir compra", "Compras pela internet"],
    hasImage: true,
  },
  {
    id: 8,
    title: "Por que não consigo acessar minha conta?",
    desc: "Caso esteja tendo problemas para fazer login, talvez você esteja inserindo informações de conta erradas ou tenha que redefinir sua senha.",
    tags: ["Não consigo acessar minha conta", "Conta suspensa"],
    hasImage: true,
  },
  {
    id: 9,
    title: "Encontrar um pacote perdido que aparece como entregue",
    desc: "A maioria dos pacotes chega no prazo, mas, às vezes, o rastreamento pode indicar \"entregue\" e você não recebeu o pacote.",
    tags: ["Atraso na entrega", "Produto não recebido"],
    hasImage: true,
  },
  {
    id: 10,
    title: "Prime Gaming",
    desc: "Para obter assistência com problemas do Prime Gaming, acesse as nossas páginas de Suporte ao Prime Gaming.",
    tags: [],
    hasImage: true,
  },
];

const ALL_TAGS = [
  "Atraso na entrega",
  "Produto não recebido",
  "Estorno do valor pago",
  "Cobrança indevida",
  "Cancelamento da conta",
  "Troca-Devolução de produto",
  "Compras pela internet",
  "Conta suspensa",
];

const FaqPage = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = FAQ_ARTICLES.filter((a) => {
    if (selectedTag && !a.tags.includes(selectedTag)) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <CompanyPage>
      {({ cv }) => {
        const companyName = cv('company_name', 'Agro Brasil');
        return (
          <div style={{ backgroundColor: '#f9f9f9' }}>
            <Seo
              title={`FAQ ${companyName} - Perguntas frequentes | Reclame Aqui`}
              description={`Perguntas frequentes sobre ${companyName}. Encontre respostas para dúvidas sobre entrega, reembolso, trocas e mais.`}
              keywords={["faq", "perguntas frequentes", companyName.toLowerCase(), "ajuda", "dúvidas"]}
              canonicalPath="/empresa-faq"
            />
            {/* Hero */}
            <div className="py-10 md:py-14 px-4 flex flex-col items-center" style={{ backgroundColor: '#eaedf0' }}>
              <h2 className="text-lg md:text-[32px] font-bold text-center mb-2" style={{ color: '#1a1a1a' }}>
                Precisa de ajuda com {companyName}?
              </h2>
              <h3 className="text-sm md:text-[21px] font-normal text-center mb-8" style={{ color: '#4B5963' }}>
                Veja se temos a resposta para o seu problema
              </h3>

              {/* Search */}
              <div className="w-full max-w-[565px] relative mb-8">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar na FAQ..."
                  className="w-full py-4 px-4 pr-12 rounded text-base"
                  style={{ border: '1px solid #e1e3e5', color: '#000' }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5" style={{ color: '#1f69c1' }} />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center max-w-[815px]">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors ${
                    !selectedTag ? 'text-white' : ''
                  }`}
                  style={{
                    backgroundColor: !selectedTag ? '#1f69c1' : 'rgba(207,216,244,0.3)',
                    color: !selectedTag ? '#fff' : '#1f69c1',
                  }}
                >
                  Todos
                </button>
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors"
                    style={{
                      backgroundColor: selectedTag === tag ? '#1f69c1' : 'rgba(207,216,244,0.3)',
                      color: selectedTag === tag ? '#fff' : '#1f69c1',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles */}
            <div className="max-w-[1185px] mx-auto px-4 my-6">
              <div className="bg-white rounded-md" style={{ border: '1px solid #e1e3e5' }}>
                <div className="p-4 md:px-8 md:py-6">
                  <h3 className="text-lg md:text-2xl font-bold mb-1" style={{ color: '#4B5963' }}>
                    FAQ {companyName}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:px-8 md:pb-8">
                  {filtered.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-sm" style={{ color: '#4B5963' }}>Nenhum resultado encontrado.</p>
                    </div>
                  ) : (
                    filtered.map((article) => (
                      <a
                        key={article.id}
                        href="#"
                        className="flex gap-4 rounded-md p-4 no-underline transition-colors hover:bg-[#f8f9ff]"
                        style={{ border: '1px solid #e1e3e5' }}
                      >
                        {/* Image */}
                        <div className="hidden md:flex flex-none w-[162px] h-[158px] rounded-md overflow-hidden">
                          {article.hasImage ? (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(225.63deg, rgba(222,240,210,0.6) 9.98%, #96bb1c 112.33%)',
                              }}
                            >
                              <BookOpen className="w-10 h-10" style={{ color: 'rgba(2,102,52,0.4)' }} />
                            </div>
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(225.63deg, rgba(222,240,210,0.6) 9.98%, #96bb1c 112.33%)',
                              }}
                            >
                              <BookOpen className="w-10 h-10" style={{ color: 'rgba(2,102,52,0.4)' }} />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 py-2 overflow-hidden">
                          <h4
                            className="text-base md:text-lg font-bold mb-2 no-underline"
                            style={{ color: '#4B5963' }}
                          >
                            {article.title}
                          </h4>
                          <p
                            className="text-sm leading-relaxed line-clamp-2"
                            style={{ color: '#4B5963' }}
                          >
                            {article.desc}
                          </p>
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {article.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 rounded-full text-xs font-bold"
                                  style={{
                                    backgroundColor: 'rgba(207,216,244,0.3)',
                                    color: '#1f69c1',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Help CTA */}
            <div className="max-w-[1185px] mx-auto px-4 pb-10">
              <div className="flex flex-col items-center py-12">
                <h3 className="text-xl font-bold text-center mb-2" style={{ color: '#4B5963' }}>
                  Não encontrou o que precisava?
                </h3>
                <p className="text-lg text-center mb-6" style={{ color: '#4B5963' }}>
                  Faça uma reclamação no Reclame AQUI
                </p>
                <button
                  className="px-8 py-3 rounded font-semibold text-white text-sm"
                  style={{ backgroundColor: '#DF2930' }}
                >
                  Reclamar
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </CompanyPage>
  );
};

export default FaqPage;
