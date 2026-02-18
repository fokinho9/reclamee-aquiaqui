import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";

const AboutSection = ({ companyName = "Amazon" }: { companyName?: string }) => {
  const [ravOpen, setRavOpen] = useState(false);
  const [cnpjCopied, setCnpjCopied] = useState(false);

  const copyCnpj = () => {
    navigator.clipboard.writeText("15.436.940/0001-03");
    setCnpjCopied(true);
    setTimeout(() => setCnpjCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ── Sobre Amazon ── */}
      <div>
        <h2 id="descricao-empresa" className="text-xl font-bold mb-4" style={{ color: '#1A2B3D' }}>Sobre {companyName}</h2>

        {/* Conheça Amazon */}
        <article className="bg-background rounded-xl p-5 mb-4" style={{ border: '1px solid #E8ECF0' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2.00006V6.10352e-05H17V2.00006H1ZM1 16.0001V10.0001H0V8.00006L1 3.00006H17L18 8.00006V10.0001H17V16.0001H15V10.0001H11V16.0001H1ZM3 14.0001H9V10.0001H3V14.0001ZM2.05 8.00006H15.95L15.35 5.00006H2.65L2.05 8.00006Z" fill="#4B5963"/>
            </svg>
            <h3 className="text-sm font-bold" style={{ color: '#1A2B3D' }}>Conheça {companyName}</h3>
          </div>
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#5A6872' }}>
            A Amazon.com.br oferece milhares de ofertas e produtos em diversas categorias, que incluem itens vendidos e entregues pela Amazon ou por vendedores parceiros.
          </p>

          {/* Cadastro */}
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9844 18.0156V7H2.01562V18.0156H15.9844ZM12.9844 0.015625H15V1.98438H15.9844C16.5469 2.01563 17.0156 2.21875 17.3906 2.59375C17.7969 2.96875 18 3.4375 18 4V18.0156C18 18.5781 17.7969 19.0469 17.3906 19.4219C17.0156 19.7969 16.5469 19.9844 15.9844 19.9844H2.01562C1.45312 19.9844 0.96875 19.7969 0.5625 19.4219C0.1875 19.0469 0 18.5781 0 18.0156V4C0 3.4375 0.1875 2.96875 0.5625 2.59375C0.96875 2.21875 1.45312 2.01563 2.01562 1.98438H3V0.015625H5.01562V1.98438H12.9844V0.015625ZM7.875 10.9844L9 7.5625L10.125 10.9844H13.7344L10.7812 13.1406L11.9062 16.5625L9 14.4531L6.09375 16.5625L7.17188 13.0938L4.26562 10.9844H7.875Z" fill="#4B5963"/>
            </svg>
            <p className="text-[13px]" style={{ color: '#5A6872' }}>
              Há quase 20 anos no Reclame <span style={{ color: '#1B8B4F', fontWeight: 600 }}>aqui.</span>
            </p>
          </div>

          {/* Selo Verificada */}
          <a href="https://blog.reclameaqui.com.br/selo-ra-verificada-certifica-credibilidade-da-empresa/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mb-3">
            <img src="/images/seal-ra-verified.png" alt="Selo RA Verificada" className="w-4 h-4" />
            <span className="text-[13px] font-semibold" style={{ color: '#1B8B4F' }}>Verificada</span>
          </a>

          {/* CNPJ */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold" style={{ color: '#5A6872' }}>CNPJ:</span>
            <p className="text-[13px]" style={{ color: '#3D4F5F' }}>15.436.940/0001-03</p>
            <button onClick={copyCnpj} className="text-[#1F69C1] hover:opacity-70" title="Copiar">
              {cnpjCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Razão social */}
          <div className="mb-2">
            <span className="text-xs font-semibold" style={{ color: '#5A6872' }}>Razão social:</span>
            <p className="text-[13px]" style={{ color: '#3D4F5F' }}>Amazon</p>
          </div>

          <span className="text-[11px]" style={{ color: '#8A9BAE' }}>Informações cadastradas pela empresa.</span>
        </article>

        {/* Empresa verificada (accordion) */}
        <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
          <button
            onClick={() => setRavOpen(!ravOpen)}
            className="w-full flex items-center justify-between px-5 py-4"
            style={{ backgroundColor: '#1B8B4F' }}
          >
            <div className="flex items-center gap-2">
              <img src="/images/seal-ra-verified.png" alt="Selo RA Verificada" className="w-5 h-5 brightness-0 invert" />
              <p className="text-sm font-semibold text-white">Empresa verificada</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-white transition-transform ${ravOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Criteria summary (always visible when open) */}
          {ravOpen && (
            <div className="bg-background">
              <div className="px-5 py-4">
                <p className="text-sm font-semibold mb-3" style={{ color: '#1A2B3D' }}>Critérios de verificação</p>
                <div className="space-y-3">
                  {[
                    { label: "Identidade", icon: "🪪" },
                    { label: "Site cadastrado", icon: "🌐" },
                    { label: "Atividade no Reclame AQUI", icon: "📊" },
                    { label: "Checagens de segurança", icon: "🛡️" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.icon}</span>
                        <p className="text-[13px] font-medium" style={{ color: '#1A2B3D' }}>{item.label}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#1B8B4F"/><path d="M6.5 10.5L4 8l-.7.7 3.2 3.2 6.8-6.8-.7-.7L6.5 10.5z" fill="white"/></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed criteria */}
              <div className="px-5 pb-4 space-y-4" style={{ borderTop: '1px solid #E8ECF0' }}>
                {[
                  { label: "Identidade", desc: "Confirmamos a identidade de um dos membros do quadro societário administrativo da empresa." },
                  { label: "Site cadastrado", desc: "A empresa tem um site cadastrado." },
                  { label: "Atividade no Reclame AQUI", desc: "Exigimos que a empresa tenha bons índices de taxa de resposta das reclamações e tenha um bom histórico de reputação conosco." },
                  { label: "Checagens de segurança", desc: "A empresa apresenta evidências de confiabilidade." },
                ].map((item) => (
                  <div key={item.label} className="pt-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-semibold" style={{ color: '#5A6872' }}>{item.label}</p>
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#1B8B4F"/><path d="M6.5 10.5L4 8l-.7.7 3.2 3.2 6.8-6.8-.7-.7L6.5 10.5z" fill="white"/></svg>
                        <span className="text-[11px] font-medium" style={{ color: '#1B8B4F' }}>aprovado</span>
                      </div>
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: '#8A9BAE' }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-4" style={{ borderTop: '1px solid #E8ECF0' }}>
                <a
                  href="https://produtos.reclameaqui.com.br/ra-verificada?utm_source=site-ra&utm_medium=sobre-empresa&utm_campaign=criterios-ra-verificada&utm_content=link-saiba-mais"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[13px] font-semibold mt-3"
                  style={{ color: '#2B6CB0' }}
                >
                  Saber mais sobre a verificação <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* YouTube + CTA */}
        <div className="mb-4">
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
            <iframe
              title="Youtube vídeo: Amazon"
              src="https://www.youtube.com/embed/MVaaQ8Qu7Iw"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
            />
          </div>
          <a
            href="https://www.amazon.com.br/gp/css/order-history?ref_=nav_orders_first"
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full flex items-center justify-between px-5 py-3 rounded-lg text-white font-semibold text-sm"
            style={{ backgroundColor: '#2B6CB0' }}
          >
            Seus pedidos <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Encontre Amazon */}
        <article className="bg-background rounded-xl p-5 mb-4" style={{ border: '1px solid #E8ECF0' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.95 11.35L11.9 6.4L10.475 4.975L6.95 8.5L5.55 7.1L4.125 8.525L6.95 11.35ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z" fill="#131D07"/>
            </svg>
            <h3 className="text-sm font-bold" style={{ color: '#1A2B3D' }}>Encontre {companyName}</h3>
          </div>
          <div className="mb-3">
            <span className="text-xs font-semibold" style={{ color: '#5A6872' }}>Endereço</span>
            <p className="text-[13px] mt-1 leading-relaxed" style={{ color: '#3D4F5F' }}>
              AVENIDA PRESIDENTE JUSCELINO KUBITSCHEK, 2041 - ANDAR 18 20 21 22 E 23 LADO A TORRE E - VILA NOVA CONCEICAO - SAO PAULO - SP - 04543011
            </p>
            <a
              href="https://maps.google.com?q=AVENIDA+PRESIDENTE+JUSCELINO+KUBITSCHEK,+2041+VILA+NOVA+CONCEICAO+SAO+PAULO+SP"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[13px] font-semibold mt-2"
              style={{ color: '#2B6CB0' }}
            >
              Como chegar
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0.34375 8.71875L7.40625 1.65625H3V0.34375H9.65625V7H8.34375V2.59375L1.28125 9.65625L0.34375 8.71875Z" fill="#1F69C1"/></svg>
            </a>
          </div>
        </article>

        {/* O que você precisa saber */}
        <article className="bg-background rounded-xl p-5 mb-4" style={{ border: '1px solid #E8ECF0' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 14H11V12H4V14ZM4 10H14V8H4V10ZM4 6H14V4H4V6ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16Z" fill="#131D07"/>
            </svg>
            <h3 className="text-sm font-bold" style={{ color: '#1A2B3D' }}>O que você precisa saber sobre {companyName}</h3>
          </div>
          <p className="text-[13px] font-semibold mb-4" style={{ color: '#3D4F5F' }}>Nos últimos 6 meses, {companyName}:</p>

          <div className="space-y-4">
            {[
              { icon: "👤✓", text: <>Resolveu <strong style={{ color: '#1F69C1' }}>88%</strong> dos problemas</> },
              { icon: "💬", text: <>Respondeu <strong style={{ color: '#1F69C1' }}>88.4%</strong> das reclamações</> },
              { icon: "⏱", text: <>Tempo médio das respostas é de <strong style={{ color: '#1F69C1' }}>19 dias e 13 horas</strong></> },
              { icon: "📢", text: <>Recebeu <a href="#" className="font-bold" style={{ color: '#1F69C1', textDecoration: 'underline' }}>106194 Reclamações</a></> },
              { icon: "📄", text: <>A maioria das reclamações são sobre <a href="#" className="font-bold" style={{ color: '#1F69C1', textDecoration: 'underline' }}>Produto não recebido</a> e <a href="#" className="font-bold" style={{ color: '#1F69C1', textDecoration: 'underline' }}>Atraso na entrega</a>.</> },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-none text-sm" style={{ backgroundColor: '#D4EDDA' }}>
                  {item.icon}
                </div>
                <p className="text-[13px] leading-relaxed pt-1" style={{ color: '#3D4F5F' }}>{item.text}</p>
              </div>
            ))}
          </div>
          <span className="text-[11px] mt-4 block" style={{ color: '#8A9BAE' }}>Período de: 01/08/2025 - 31/01/2026</span>
        </article>
      </div>

      {/* Todos os contatos */}
      <div>
        <h3 className="text-[15px] font-bold mb-3" style={{ color: '#1A2B3D' }}>Todos os contatos de {companyName}</h3>
        <div className="bg-background rounded-xl p-5" style={{ border: '1px solid #E8ECF0' }}>
          <h4 className="font-bold text-sm mb-3" style={{ color: '#1A2B3D' }}>Contatos da empresa</h4>
          <p className="text-xs mb-2" style={{ color: '#8A9BAE' }}>Site</p>
          <a
            href="http://www.amazon.com.br"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium mb-2"
            style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2B6CB0"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
            amazon.com.br
          </a>
          <a
            href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=508510"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2B6CB0"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
            Ir para o atendimento
          </a>
          <div className="flex gap-5 mt-4 justify-center">
            <a href="https://www.facebook.com/Amazon.com.br/" target="_blank" rel="nofollow noopener noreferrer">
              <img src="/images/social-facebook.png" alt="Facebook" className="w-7 h-7" />
            </a>
            <a href="https://www.instagram.com/amazonbrasil/" target="_blank" rel="nofollow noopener noreferrer">
              <img src="/images/social-instagram.png" alt="Instagram" className="w-7 h-7" />
            </a>
            <a href="https://twitter.com/amazonBR" target="_blank" rel="nofollow noopener noreferrer">
              <img src="/images/social-x.png" alt="X" className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
