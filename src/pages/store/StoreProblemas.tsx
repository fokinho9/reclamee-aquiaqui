import { StoreCompanyPage, ProblemsSection } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const StoreProblemas = () => (
  <StoreCompanyPage>
    {({ cv }) => (
      <>
        <Seo title={`Problemas ${cv('company_name', 'Empresa')} - Reclame Aqui`} description={`Principais problemas de ${cv('company_name', 'Empresa')}.`} canonicalPath="#" />
        <ProblemsSection companyName={cv('company_name', 'Empresa')} />
      </>
    )}
  </StoreCompanyPage>
);

export default StoreProblemas;
