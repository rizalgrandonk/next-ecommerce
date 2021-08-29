import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Page Not Found
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-16 py-16 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div
          className="relative w-1/2 h-[70vh] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/404-secondary.svg)",
          }}
        />
        <div className="w-1/2 text-right">
          <p className="text-5xl font-semibold mb-2">Oops!</p>
          <p className="text-3xl mb-16">We couldn&apos;t find that page</p>
          <p className="text-xl mb-3">Maybe you can find what you need here</p>
          <div className="flex text-white justify-end gap-3 text-sm">
            <Link href="/products">
              <a className="inline-block px-5 py-2 bg-primary hover:bg-opacity-80 font-semibold tracking-wider uppercase">
                Products
              </a>
            </Link>
            <Link href="/categories">
              <a className="inline-block px-5 py-2 bg-secondary hover:bg-opacity-80 font-semibold tracking-wider uppercase">
                Categories
              </a>
            </Link>
            <Link href="/">
              <a className="inline-block px-5 py-2 bg-gray-500 hover:bg-opacity-80 font-semibold tracking-wider uppercase">
                Back to home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;