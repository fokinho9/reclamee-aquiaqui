import { useState } from "react";
import Seo from "@/components/seo/Seo";
import { Header, Footer } from "@/components/CompanyLayout";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const CONTACT_CHANNELS = [
  { icon: Mail, title: "E-mail", info: "contato@reclameaqui.com.br", desc: "Respondemos em até 2 dias úteis" },
  { icon: Phone, title: "Telefone", info: "(11) 3003-0041", desc: "Seg a Sex, 9h às 18h" },
  { icon: MapPin, title: "Endereço", info: "Av. Pres. Juscelino Kubitschek, 2041", desc: "São Paulo - SP, 04543-011" },
  { icon: Clock, title: "Horário", info: "Segunda a Sexta", desc: "09:00 às 18:00" },
];

const FaleConosco = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
      <Seo
        title="Fale Conosco - Reclame Aqui"
        description="Entre em contato com o Reclame AQUI. Envie sua mensagem, dúvida ou sugestão para nossa equipe."
        keywords={["fale conosco", "contato", "reclame aqui", "atendimento"]}
        canonicalPath="/fale-conosco"
      />
      <Header />
      <main className="max-w-[900px] mx-auto px-4 md:px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1A2B3D' }}>Fale Conosco</h1>

        {/* Contact channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CONTACT_CHANNELS.map((c) => (
            <div key={c.title} className="bg-white rounded-xl p-5" style={{ border: '1px solid #E8ECF0' }}>
              <c.icon className="w-6 h-6 mb-3" style={{ color: '#1B8B4F' }} />
              <h3 className="text-sm font-semibold mb-1" style={{ color: '#1A2B3D' }}>{c.title}</h3>
              <p className="text-sm font-medium" style={{ color: '#2B6CB0' }}>{c.info}</p>
              <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-xl p-6 md:p-10" style={{ border: '1px solid #E8ECF0' }}>
          <h2 className="text-lg font-bold mb-6" style={{ color: '#1A2B3D' }}>Envie sua mensagem</h2>

          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F1F9E6' }}>
                <Send className="w-7 h-7" style={{ color: '#1B8B4F' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A2B3D' }}>Mensagem enviada!</h3>
              <p className="text-sm" style={{ color: '#5A6872' }}>Recebemos sua mensagem e responderemos em breve.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-4 text-sm font-semibold" style={{ color: '#2B6CB0' }}>
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B3D' }}>Nome completo</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30" style={{ borderColor: '#E8ECF0' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B3D' }}>E-mail</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30" style={{ borderColor: '#E8ECF0' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B3D' }}>Assunto</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30" style={{ borderColor: '#E8ECF0' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B3D' }}>Mensagem</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30 resize-none" style={{ borderColor: '#E8ECF0' }} />
              </div>
              <button type="submit"
                className="px-8 py-3 rounded-lg font-semibold text-white text-sm" style={{ backgroundColor: '#1B8B4F' }}>
                Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaleConosco;
