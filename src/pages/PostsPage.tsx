import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import Seo from "@/components/seo/Seo";
import {
  Header, CompanyHero, TabNav, Footer,
  SidebarSection,
} from "@/components/CompanyLayout";

const SIDEBAR_CARDS = [
  {
    type: "blue" as const,
    category: "Artigo",
    title: "Proteja-se contra fraudes e golpes por mensagens",
    desc: "Se você recebeu uma mensagem, e-mail ou telefonema sobre um pedido inesperado ou uma atividade não autorizada na sua conta...",
    date: "24 de março de 2025",
  },
  {
    type: "green" as const,
    category: "Artigo",
    title: "OFERTAS DA AGRO BRASIL",
    desc: "Confira as melhores ofertas na Agro Brasil!",
    date: "",
  },
];

const POSTS = [
  {
    title: "Como entrar em contato com o Serviço de Atendimento ao Cliente da Agro Brasil?",
    desc: "Para conferir as formas de entrar em contato com o Serviço de Atendimento ao Cliente da Agro Brasil, acesse a página Fale Conosco.",
    date: "17 de fevereiro de 2025",
    image: "/images/post-fraudes.jpg",
  },
  {
    title: "Proteja-se contra fraudes e golpes por mensagens",
    desc: "Se você recebeu uma mensagem, e-mail ou telefonema sobre um pedido inesperado ou uma atividade não autorizada na sua conta...",
    date: "24 de março de 2025",
    image: "/images/post-fraudes.jpg",
  },
  {
    title: "Como funciona a entrega da Agro Brasil?",
    desc: "A Agro Brasil conta com centros de distribuição em todo o Brasil para garantir entregas rápidas e seguras.",
    date: "10 de janeiro de 2025",
    image: "/images/post-entrega.jpg",
  },
  {
    title: "Política de reembolsos Agro Brasil",
    desc: "Saiba como funcionam os reembolsos na Agro Brasil, prazos e condições para devolução de produtos.",
    date: "5 de fevereiro de 2025",
    image: "/images/post-reembolsos.jpg",
  },
];

const PostsPage = () => {
  const { data: content } = useSiteContent();
  const cv = (key: string, fallback: string) => {
    if (!content) return fallback;
    const item = content.find((i) => i.content_key === key);
    return item?.content_value ?? fallback;
  };

  const companyName = cv("company_name", "Agro Brasil");

  const postsContent = (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100%" }}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar left - highlighted cards */}
        <div className="flex flex-col gap-6 w-full md:max-w-[310px] flex-none">
          {SIDEBAR_CARDS.map((card, i) => (
            <a
              key={i}
              href="#"
              className="rounded-lg p-4 flex flex-col gap-3 no-underline"
              style={{
                backgroundColor: card.type === "blue" ? "#E5EEFB" : "#F1F9E6",
                boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.25)",
              }}
            >
              <span className="text-xs font-medium" style={{ color: "#303633" }}>
                {card.category}
              </span>
              <div className="flex flex-col gap-1">
                <h4
                  className="text-base font-semibold leading-5 m-0"
                  style={{
                    color: "#191B1A",
                    textTransform: card.type === "green" ? "uppercase" : undefined,
                  }}
                >
                  {card.title}
                </h4>
                <p className="text-sm leading-5 m-0" style={{ color: "#303633" }}>
                  {card.desc}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold" style={{ color: "#1F69C1" }}>
                  Ler mais
                </span>
                {card.date && (
                  <span className="text-sm font-medium" style={{ color: "#1F69C1" }}>
                    {card.date}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Main content - posts grid */}
        <div className="flex-1 flex flex-col gap-6">
          <h3 className="text-xl font-semibold m-0" style={{ color: "#000" }}>
            O que {companyName} está postando
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {POSTS.map((post, i) => (
              <a
                key={i}
                href="#"
                className="flex flex-col bg-white rounded overflow-hidden no-underline"
                style={{
                  border: "1px solid #e1e3e5",
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.16)",
                }}
              >
                <div className="w-full h-[160px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-xs font-medium" style={{ color: "#A9B0B5" }}>
                    {post.date}
                  </span>
                  <h4 className="text-base font-semibold leading-5 m-0" style={{ color: "#191B1A" }}>
                    {post.title}
                  </h4>
                  <p className="text-sm leading-5 m-0 line-clamp-2" style={{ color: "#4B5963" }}>
                    {post.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-auto pt-2">
                    <span className="text-sm font-semibold" style={{ color: "#1F69C1" }}>
                      Ler mais
                    </span>
                    <ArrowRight className="w-4 h-4" style={{ color: "#1F69C1" }} />
                  </div>
                </div>
              </a>
            ))}

            {/* Load more */}
            <div className="col-span-1 md:col-span-2 flex justify-center py-4">
              <button
                className="px-6 py-2 rounded text-sm font-semibold bg-transparent cursor-pointer"
                style={{ border: "1px solid #1F69C1", color: "#1F69C1" }}
              >
                Ver mais conteúdos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
      <Seo
        title={`Posts de ${companyName} - Reclame Aqui`}
        description={`Confira os posts e artigos publicados por ${companyName} no Reclame AQUI.`}
        keywords={["posts", "artigos", companyName.toLowerCase(), "novidades"]}
        canonicalPath="/empresa-posts"
      />
      <Header />
      <CompanyHero cv={cv} />
      <TabNav />
      <main className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile */}
        <div className="lg:hidden">
          {postsContent}
        </div>

        {/* Desktop - 3 column layout */}
        <div className="hidden lg:grid grid-cols-[1fr_280px] gap-6">
          <div>{postsContent}</div>
          <div><SidebarSection cv={cv} /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostsPage;
