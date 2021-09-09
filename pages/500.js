import Meta from "@/components/Meta";

const Custom500 = () => {
  const seo = {
    title: `Server Error | Grandonk Merch`,
    description: "An internal server error",
  };

  return (
    <>
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Server Error
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-16 py-12 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div
          className="relative w-full lg:w-1/2 h-[30vh] lg:h-[70vh] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/server-error.svg)",
          }}
        />
        <div className="w-full lg:w-1/2 text-center lg:text-right">
          <p className="text-5xl font-semibold mb-2">Oops!</p>
          <p className="text-3xl mb-16">Internal Server Error</p>
          <p className="text-xl mb-3">Yoou can try to visit again later</p>
        </div>
      </div>
    </>
  );
};

export default Custom500;
