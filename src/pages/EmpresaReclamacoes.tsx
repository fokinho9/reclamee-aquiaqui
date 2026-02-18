import { CompanyPage, ComplaintsSection } from "@/components/CompanyLayout";

const EmpresaReclamacoes = () => (
  <CompanyPage>
    {({ cv }) => <ComplaintsSection companyName={cv('company_name', 'Amazon')} />}
  </CompanyPage>
);

export default EmpresaReclamacoes;
