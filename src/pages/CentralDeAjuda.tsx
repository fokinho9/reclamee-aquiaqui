import { useState } from "react";
import Seo from "@/components/seo/Seo";
import { Header, Footer } from "@/components/CompanyLayout";
import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "Conta e Acesso",
    questions: [
      { q: "Como trocar minha senha?", a: "Acesse o menu do seu perfil, clique em 'Configurações' e depois em 'Alterar senha'. Você receberá um e-mail de confirmação para redefinir sua senha." },
      { q: "Esqueci minha senha, como recuperar?", a: "Na página de login, clique em 'Esqueci minha senha'. Informe o e-mail cadastrado e você receberá um link para redefinição." },
      { q: "Como excluir minha conta?", a: "Para excluir sua conta, acesse Configurações > Conta > Excluir conta. Note que essa ação é irreversível e todas as suas reclamações serão removidas." },
    ],
  },
  {
    category: "Reclamações",
    questions: [
      { q: "Como fazer uma reclamação?", a: "Clique em 'Reclamar', busque a empresa, preencha os dados da sua reclamação com título, descrição detalhada e categoria do problema. A empresa será notificada automaticamente." },
      { q: "Quanto tempo a empresa tem para responder?", a: "As empresas têm até 10 dias úteis para responder. Após esse prazo, a reclamação é marcada como 'Não respondida', o que afeta negativamente a reputação da empresa." },
      { q: "Posso editar uma reclamação depois de publicada?", a: "Não é possível editar uma reclamação após a publicação. Se necessário, você pode adicionar uma consideração final após a resposta da empresa." },
      { q: "Fiz uma reclamação e a empresa não respondeu, o que fazer?", a: "Se a empresa não respondeu no prazo, você pode compartilhar sua reclamação nas redes sociais para dar mais visibilidade. Também pode entrar em contato com órgãos de defesa do consumidor como o Procon." },
    ],
  },
  {
    category: "Empresas",
    questions: [
      { q: "Não encontrei uma empresa no site, como cadastrar?", a: "Clique em 'Cadastrar empresa' no menu principal. Informe o nome, CNPJ e site da empresa. Após validação, ela estará disponível para receber reclamações." },
      { q: "Como funciona o ranking das empresas?", a: "O ranking é baseado em critérios como taxa de resposta, índice de solução, nota dos consumidores e tempo médio de resposta. As empresas são classificadas como Ótimo, Bom, Regular, Ruim ou Não Recomendada." },
      { q: "O que significa empresa verificada?", a: "Uma empresa verificada passou por um processo de validação do Reclame AQUI que confirma sua identidade, site cadastrado, atividade na plataforma e checagens de segurança." },
    ],
  },
  {
    category: "Reputação e Notas",
    questions: [
      { q: "Como é calculada a nota da empresa?", a: "A nota é calculada com base em: índice de resposta, índice de solução, nota média dada pelos consumidores e o índice de novos negócios (se o consumidor voltaria a fazer negócio com a empresa)." },
      { q: "O que é o selo RA1000?", a: "O RA1000 é um selo de excelência concedido às empresas que mantêm altos padrões de atendimento: índice de resposta acima de 90%, índice de solução acima de 90%, nota acima de 7.0 e índice de novos negócios acima de 70%." },
    ],
  },
];

const CentralDeAjuda = () => {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenItems((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  // Build FAQ JSON-LD
  const allQuestions = FAQ_ITEMS.flatMap((cat) => cat.questions);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  const filteredCategories = FAQ_ITEMS.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) => !search || q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
      <Seo
        title="Central de Ajuda - Reclame Aqui"
        description="Encontre respostas para suas dúvidas sobre o Reclame AQUI. Central de ajuda com perguntas frequentes sobre conta, reclamações, empresas e mais."
        keywords={["central de ajuda", "FAQ", "perguntas frequentes", "reclame aqui", "ajuda"]}
        canonicalPath="/central-de-ajuda"
        jsonLd={faqJsonLd}
      />
      <Header />
      <main className="max-w-[900px] mx-auto px-4 md:px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-8">
          <HelpCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#1B8B4F' }} />
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1A2B3D' }}>Central de Ajuda</h1>
          <p className="text-sm" style={{ color: '#5A6872' }}>Encontre respostas para suas dúvidas sobre o Reclame AQUI</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-[500px] mx-auto">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar na central de ajuda..."
            className="w-full py-3 px-4 pr-12 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
            style={{ borderColor: '#E8ECF0' }} />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#8A9BAE' }} />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: '#5A6872' }}>Nenhum resultado encontrado para "{search}"</p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.category} className="bg-white rounded-xl" style={{ border: '1px solid #E8ECF0' }}>
                <h2 className="text-base font-bold px-6 py-4" style={{ color: '#1A2B3D', borderBottom: '1px solid #E8ECF0' }}>
                  {cat.category}
                </h2>
                <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
                  {cat.questions.map((item) => {
                    const id = `${cat.category}-${item.q}`;
                    const isOpen = openItems.includes(id);
                    return (
                      <div key={id}>
                        <button onClick={() => toggle(id)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F7F9FB] transition-colors">
                          <span className="text-sm font-medium pr-4" style={{ color: '#1A2B3D' }}>{item.q}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 flex-none" style={{ color: '#8A9BAE' }} />
                            : <ChevronDown className="w-4 h-4 flex-none" style={{ color: '#8A9BAE' }} />}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-sm leading-relaxed" style={{ color: '#5A6872' }}>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 py-8">
          <p className="text-base font-semibold mb-2" style={{ color: '#1A2B3D' }}>Não encontrou o que precisava?</p>
          <p className="text-sm mb-4" style={{ color: '#5A6872' }}>Entre em contato com nossa equipe</p>
          <a href="/fale-conosco" className="inline-flex px-6 py-3 rounded-lg font-semibold text-white text-sm" style={{ backgroundColor: '#1B8B4F' }}>
            Fale Conosco
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CentralDeAjuda;
