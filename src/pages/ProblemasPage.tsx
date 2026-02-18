import { CompanyPage, ProblemsSection } from "@/components/CompanyLayout";

const ProblemasPage = () => (
  <CompanyPage>
    {({ cv }) => <ProblemsSection companyName={cv('company_name', 'Agro Brasil')} />}
  </CompanyPage>
);

export default ProblemasPage;
