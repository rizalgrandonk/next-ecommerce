import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, categories }) => {
  return (
    <>
      <Navbar />
      <main className="bg-light min-h-screen overflow-hidden">{children}</main>
      <Footer categories={categories} />
    </>
  );
};

export default Layout;
