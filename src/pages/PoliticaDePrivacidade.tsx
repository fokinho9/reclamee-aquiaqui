import Seo from "@/components/seo/Seo";
import { Header, Footer } from "@/components/CompanyLayout";

const PoliticaDePrivacidade = () => (
  <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
    <Seo
      title="Política de Privacidade - Reclame Aqui"
      description="Saiba como o Reclame AQUI coleta, utiliza e protege seus dados pessoais conforme a LGPD."
      keywords={["política de privacidade", "LGPD", "dados pessoais", "reclame aqui"]}
      canonicalPath="/politica-de-privacidade"
    />
    <Header />
    <main className="max-w-[900px] mx-auto px-4 md:px-6 py-10">
      <article className="bg-white rounded-xl p-6 md:p-10" style={{ border: '1px solid #E8ECF0' }}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1A2B3D' }}>Política de Privacidade</h1>
        <p className="text-xs mb-6" style={{ color: '#8A9BAE' }}>Última atualização: 01 de janeiro de 2026</p>

        <section className="space-y-6 text-sm leading-relaxed" style={{ color: '#4B5963' }}>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>1. Informações que Coletamos</h2>
            <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail, CPF e dados de contato ao criar uma conta ou registrar uma reclamação. Também coletamos dados de navegação automaticamente, como endereço IP, tipo de navegador e páginas visitadas.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>2. Como Utilizamos suas Informações</h2>
            <p>Suas informações são utilizadas para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Gerenciar sua conta e fornecer nossos serviços;</li>
              <li>Processar e encaminhar reclamações às empresas;</li>
              <li>Enviar comunicações sobre o andamento de suas reclamações;</li>
              <li>Melhorar a experiência do usuário na plataforma;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>3. Compartilhamento de Dados</h2>
            <p>Compartilhamos seus dados pessoais com as empresas reclamadas para viabilizar a resolução de problemas. Não vendemos dados pessoais a terceiros. Podemos compartilhar dados anonimizados para fins estatísticos e de pesquisa.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>4. Cookies e Tecnologias de Rastreamento</h2>
            <p>Utilizamos cookies e tecnologias similares para personalizar sua experiência, analisar o tráfego do site e melhorar nossos serviços. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>5. Segurança dos Dados</h2>
            <p>Adotamos medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado, destruição, perda, alteração ou qualquer forma de tratamento inadequado.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>6. Seus Direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Confirmar a existência de tratamento de dados;</li>
              <li>Acessar seus dados pessoais;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados;</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>7. Retenção de Dados</h2>
            <p>Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo obrigações legais, contratuais e regulatórias.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>8. Contato</h2>
            <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <strong>privacidade@reclameaqui.com.br</strong></p>
          </div>
        </section>
      </article>
    </main>
    <Footer />
  </div>
);

export default PoliticaDePrivacidade;
