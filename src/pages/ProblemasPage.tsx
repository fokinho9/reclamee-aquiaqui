import { CompanyPage, ProblemsSection } from "@/components/CompanyLayout";

const ProblemasPage = () => (
  <CompanyPage>
    {({ cv }) => <ProblemsSection companyName={cv('company_name', 'Amazon')} />}
  </CompanyPage>
);

export default ProblemasPage;
