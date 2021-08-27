import Head from "next/head";

const Meta = ({ seo }) => {
  const defaultSeo = {
    title: "Grandonk Merch",
    keywords: "merch, clothing, brand",
    description:
      "Grandonk Merch is a place to get the nice looking clothes and merch",
    shareImage: "/banner.jpg",
    article: false,
  };

  const fullSeo = { ...defaultSeo, ...seo };

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />

      {fullSeo.keywords && <meta name="keywords" content={fullSeo.keywords} />}

      {fullSeo.title && (
        <>
          <title>{fullSeo.title}</title>
          <meta property="og:title" content={fullSeo.title} />
          <meta name="twitter:title" content={fullSeo.title} />
        </>
      )}

      {fullSeo.description && (
        <>
          <meta name="description" content={fullSeo.description} />
          <meta property="og:description" content={fullSeo.description} />
          <meta name="twitter:description" content={fullSeo.description} />
        </>
      )}

      {fullSeo.shareImage && (
        <>
          <meta name="image" content={fullSeo.shareImage} />
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
        </>
      )}

      {fullSeo.article && <meta property="og:type" content="article" />}

      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
