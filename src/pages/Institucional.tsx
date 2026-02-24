import Seo from "@/components/seo/Seo";
import { Header, Footer } from "@/components/CompanyLayout";
import { Building2, Users, Target, Award, TrendingUp, Globe } from "lucide-react";

const STATS = [
  { value: "30M+", label: "Consumidores cadastrados" },
  { value: "500K+", label: "Empresas cadastradas" },
  { value: "25", label: "Anos de história" },
  { value: "1M+", label: "Reclamações por mês" },
];

const VALUES = [
  { icon: Users, title: "Transparência", desc: "Acreditamos que consumidores bem informados tomam melhores decisões. Toda interação entre empresa e consumidor é pública." },
  { icon: Target, title: "Imparcialidade", desc: "Somos neutros na relação entre consumidor e empresa. Nossa função é facilitar o diálogo e promover a resolução de conflitos." },
  { icon: Award, title: "Qualidade", desc: "Nossos índices e rankings são baseados em critérios objetivos e transparentes, refletindo a real experiência dos consumidores." },
  { icon: TrendingUp, title: "Inovação", desc: "Investimos continuamente em tecnologia para melhorar a experiência dos usuários e a eficiência na resolução de problemas." },
];

const Institucional = () => (
  <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
    <Seo
      title="Institucional - Sobre o Reclame Aqui"
      description="Conheça o Reclame AQUI, a maior plataforma de solução de conflitos entre consumidores e empresas da América Latina."
      keywords={["institucional", "reclame aqui", "sobre", "empresa", "história"]}
      canonicalPath="/institucional"
    />
    <Header />
    <main>
      {/* Hero */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: '#1B8B4F' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Sobre o Reclame AQUI</h1>
          <p className="text-lg text-white/80 max-w-[600px] mx-auto">
            A maior plataforma de solução de conflitos entre consumidores e empresas da América Latina.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[900px] mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 text-center shadow-sm" style={{ border: '1px solid #E8ECF0' }}>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: '#1B8B4F' }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: '#5A6872' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="max-w-[900px] mx-auto px-4 py-10">
        <div className="bg-white rounded-xl p-6 md:p-10" style={{ border: '1px solid #E8ECF0' }}>
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6" style={{ color: '#1B8B4F' }} />
            <h2 className="text-xl font-bold" style={{ color: '#1A2B3D' }}>Nossa História</h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4B5963' }}>
            <p>Fundado em 2001 por Maurício Vargas, o Reclame AQUI nasceu da frustração de um consumidor que não conseguia resolver um problema com uma companhia aérea. A ideia era simples: criar um espaço onde consumidores pudessem expor suas experiências e empresas pudessem responder publicamente.</p>
            <p>Ao longo de mais de duas décadas, a plataforma se consolidou como referência em relações de consumo no Brasil, tornando-se uma ferramenta essencial para consumidores pesquisarem a reputação de empresas antes de realizar compras.</p>
            <p>Hoje, o Reclame AQUI conta com mais de 30 milhões de consumidores cadastrados e mais de 500 mil empresas, processando mais de 1 milhão de reclamações por mês. A plataforma é reconhecida internacionalmente como um modelo inovador de mediação de conflitos.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[900px] mx-auto px-4 pb-10">
        <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#1A2B3D' }}>Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8ECF0' }}>
              <v.icon className="w-8 h-8 mb-3" style={{ color: '#1B8B4F' }} />
              <h3 className="text-base font-semibold mb-2" style={{ color: '#1A2B3D' }}>{v.title}</h3>
              <p className="text-sm" style={{ color: '#5A6872' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-[900px] mx-auto px-4 pb-10">
        <div className="bg-white rounded-xl p-6 md:p-10" style={{ border: '1px solid #E8ECF0' }}>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6" style={{ color: '#1B8B4F' }} />
            <h2 className="text-xl font-bold" style={{ color: '#1A2B3D' }}>Nossa Missão</h2>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#4B5963' }}>
            Criar relações de confiança entre consumidores e empresas através da transparência, promovendo um mercado mais justo e equilibrado. Acreditamos que o diálogo aberto e público é o caminho mais eficiente para resolver conflitos e elevar a qualidade dos produtos e serviços oferecidos no Brasil.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Institucional;
