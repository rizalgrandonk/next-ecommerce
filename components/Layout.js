import Navbar from "./Navbar";
import Meta from "./Meta";
import Footer from "./Footer";

const Layout = ({ children, categories }) => {
  return (
    <>
      <Meta />
      <Navbar categories={categories} />
      <main className="bg-white min-h-screen overflow-hidden">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
