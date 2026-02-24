import { CompanyPage, ProblemsSection } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const ProblemasPage = () => (
  <CompanyPage>
    {({ cv }) => (
      <>
        <Seo
          title={`Principais problemas ${cv('company_name', 'Agro Brasil')} - Reclame Aqui`}
          description={`Conheça os principais problemas reportados pelos consumidores de ${cv('company_name', 'Agro Brasil')} no Reclame AQUI.`}
          keywords={["problemas", cv('company_name', 'Agro Brasil').toLowerCase(), "reclamações mais comuns"]}
          canonicalPath="/principais-problemas"
        />
        <ProblemsSection companyName={cv('company_name', 'Agro Brasil')} />
      </>
    )}
  </CompanyPage>
);

export default ProblemasPage;
