import Head from "next/head";
import { useRouter } from "next/router";

const Meta = ({ seo }) => {
  const { asPath } = useRouter();

  const defaultSeo = {
    title: "Grandonk Merch | Clothing and Apparel",
    keywords: "merch, clothing, brand",
    description:
      "Grandonk Merch is a place to get the nice looking clothes and merch",
    shareImage:
      "https://res.cloudinary.com/grandonk-merch/image/upload/v1630526973/banner_o3vmy7.jpg",
    url: `https://grandonkmerch.vercel.app${asPath}`,
    article: false,
  };

  const fullSeo = { ...defaultSeo, ...seo };

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=2"
      />
      <link rel="manifest" href="/site.webmanifest?v=2" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#353535" />
      <link rel="shortcut icon" href="/favicon.ico?v=2" />
      <meta name="msapplication-TileColor" content="#203e6a" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="keywords" content={fullSeo.keywords} />
      <link rel="canonical" href={fullSeo.url} />

      <title>{fullSeo.title}</title>
      <meta property="og:title" content={fullSeo.title} />
      <meta name="twitter:title" content={fullSeo.title} />

      <meta name="description" content={fullSeo.description} />
      <meta property="og:description" content={fullSeo.description} />
      <meta name="twitter:description" content={fullSeo.description} />

      <meta name="image" content={fullSeo.shareImage} />
      <meta property="og:image" content={fullSeo.shareImage} />
      <meta name="twitter:image" content={fullSeo.shareImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@site" />
      <meta name="twitter:creator" content="@handle" />

      <meta property="og:url" content={fullSeo.url} />
      <meta property="og:site_name" content="Grandonk Merch" />

      {fullSeo.article && <meta property="og:type" content="article" />}
    </Head>
  );
};

export default Meta;
