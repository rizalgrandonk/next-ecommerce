const OfflinePage = () => {
  return (
    <>
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            You are offline
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-16 py-12 flex flex-col lg:flex-row justify-between items-center gap-10">
        <div
          className="relative w-full lg:w-1/2 h-[30vh] lg:h-[70vh] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/connection.svg)",
          }}
        />
        <div className="w-full lg:w-1/2 text-center lg:text-right">
          <p className="text-5xl font-semibold mb-2">Oops!</p>
          <p className="text-3xl mb-16">You are offline</p>
          <p className="text-xl mb-3">Please check your internet connection</p>
        </div>
      </div>
    </>
  );
};

export default OfflinePage;
