import { useParams } from "react-router-dom";
import { StoreCompanyPage, ProblemsSection } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const StoreProblemas = () => {
  const { storeId } = useParams();
  return (
    <StoreCompanyPage>
      {({ cv }) => (
        <>
          <Seo title={`Problemas ${cv('company_name', 'Empresa')} - Reclame Aqui`} description={`Principais problemas de ${cv('company_name', 'Empresa')}.`} canonicalPath="#" />
          <ProblemsSection companyName={cv('company_name', 'Empresa')} basePath={`/loja/${storeId}`} />
        </>
      )}
    </StoreCompanyPage>
  );
};

export default StoreProblemas;
