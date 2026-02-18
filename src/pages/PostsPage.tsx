import { CompanyPage, PostCard } from "@/components/CompanyLayout";

const PostsPage = () => (
  <CompanyPage>
    {({ cv }) => (
      <div>
        <h3 className="text-[17px] font-bold mb-3" style={{ color: '#1A2B3D' }}>O que {cv('company_name', 'Amazon')} está postando</h3>
        <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
        <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
      </div>
    )}
  </CompanyPage>
);

export default PostsPage;
