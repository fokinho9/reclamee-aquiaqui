import { Helmet } from "react-helmet-async";

const SITE_NAME = "Agro Brasil - Reclame Aqui";
const DEFAULT_IMAGE = "/images/og-image.jpg";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonicalPath?: string;
  noindex?: boolean;
}

const getSiteUrl = () =>
  import.meta.env.VITE_SITE_URL || window.location.origin;

const Seo = ({
  title,
  description,
  keywords,
  image,
  canonicalPath,
  noindex = false,
}: SeoProps) => {
  const siteUrl = getSiteUrl();
  const fullUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl;
  const fullImage = image?.startsWith("http")
    ? image
    : `${siteUrl}${image || DEFAULT_IMAGE}`;
  const gscVerification = import.meta.env.VITE_GSC_VERIFICATION;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      {canonicalPath && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ReclameAQUI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Google Search Console */}
      {gscVerification && (
        <meta name="google-site-verification" content={gscVerification} />
      )}
    </Helmet>
  );
};

export default Seo;
