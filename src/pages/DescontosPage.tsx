import { Tag } from "lucide-react";
import { CompanyPage } from "@/components/CompanyLayout";

const DescontosPage = () => (
  <CompanyPage>
    {({ cv }) => (
      <div className="mt-8">
        <div className="bg-background rounded-xl p-6 text-center" style={{ border: '1px solid #E8ECF0' }}>
          <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: '#2B6CB0' }} />
          <h3 className="text-lg font-bold mb-2" style={{ color: '#1A2B3D' }}>Descontos de {cv('company_name', 'Amazon')}</h3>
          <p className="text-sm mb-4" style={{ color: '#5A6872' }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
          <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: '#2B6CB0' }}>Ver descontos</a>
        </div>
      </div>
    )}
  </CompanyPage>
);

export default DescontosPage;
