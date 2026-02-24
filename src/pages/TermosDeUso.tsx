import Seo from "@/components/seo/Seo";
import { Header, Footer } from "@/components/CompanyLayout";

const TermosDeUso = () => (
  <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
    <Seo
      title="Termos de Uso - Reclame Aqui"
      description="Leia os Termos de Uso do Reclame AQUI. Conheça as regras e condições para utilização da plataforma."
      keywords={["termos de uso", "reclame aqui", "condições", "regras"]}
      canonicalPath="/termos-de-uso"
    />
    <Header />
    <main className="max-w-[900px] mx-auto px-4 md:px-6 py-10">
      <article className="bg-white rounded-xl p-6 md:p-10" style={{ border: '1px solid #E8ECF0' }}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1A2B3D' }}>Termos de Uso</h1>
        <p className="text-xs mb-6" style={{ color: '#8A9BAE' }}>Última atualização: 01 de janeiro de 2026</p>

        <section className="space-y-6 text-sm leading-relaxed" style={{ color: '#4B5963' }}>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site Reclame AQUI, você concorda com estes Termos de Uso. Caso não concorde com qualquer parte destes termos, solicitamos que não utilize nossos serviços.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>2. Descrição do Serviço</h2>
            <p>O Reclame AQUI é uma plataforma digital que permite aos consumidores registrarem reclamações sobre produtos e serviços de empresas cadastradas, promovendo a transparência e a melhoria nas relações de consumo.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>3. Cadastro e Conta do Usuário</h2>
            <p>Para utilizar determinados recursos da plataforma, é necessário criar uma conta fornecendo informações verdadeiras, completas e atualizadas. O usuário é responsável por manter a confidencialidade de suas credenciais de acesso.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>4. Regras de Uso</h2>
            <p>O usuário se compromete a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Publicar apenas informações verdadeiras e relacionadas a experiências reais de consumo;</li>
              <li>Não utilizar linguagem ofensiva, discriminatória ou difamatória;</li>
              <li>Não publicar conteúdo que viole direitos de terceiros;</li>
              <li>Não utilizar a plataforma para fins ilícitos;</li>
              <li>Respeitar a legislação vigente e os direitos dos demais usuários.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>5. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, gráficos, logotipos, ícones, imagens e software, é de propriedade do Reclame AQUI ou de seus licenciadores e é protegido pelas leis de propriedade intelectual brasileiras.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>6. Responsabilidade</h2>
            <p>O Reclame AQUI não se responsabiliza pelo conteúdo publicado pelos usuários, mas se reserva o direito de remover publicações que violem estes Termos de Uso. A plataforma atua como intermediária entre consumidores e empresas.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>7. Modificações dos Termos</h2>
            <p>O Reclame AQUI reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações serão publicadas nesta página e entrarão em vigor imediatamente após a publicação.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>8. Legislação Aplicável</h2>
            <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da Comarca de São Paulo/SP.</p>
          </div>
        </section>
      </article>
    </main>
    <Footer />
  </div>
);

export default TermosDeUso;
