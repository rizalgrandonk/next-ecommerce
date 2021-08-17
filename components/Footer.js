import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = ({ categories }) => {
  return (
    <>
      <div className="w-full py-14 bg-gray-200 border-b border-gray-300">
        <div className="container px-6 md:px-16 h-full mx-auto flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between items-start">
          <div className="w-full md:w-1/4 flex justify-between items-start">
            <div>
              <h4 className="text-xl font-semibold mb-6">Navigate</h4>
              <ul>
                <li className="py-1">
                  <Link href="/">
                    <a className="hover:text-gray-700">Home</a>
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="/products">
                    <a className="hover:text-gray-700">Products</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Categories</h4>
              <ul>
                {categories.map((category) => (
                  <li key={category.slug} className="py-1">
                    <Link href={`/categories/${category.slug}`}>
                      <a className="hover:text-gray-700">{category.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-right">
            <h3 className="text-2xl font-semibold mb-8">
              Surabaya, Jawa Timur, Indonesia
            </h3>
            <p className="mb-2">contact@grandonkmerch.com</p>
            <p>+6281234567890</p>
          </div>
        </div>
      </div>
      <div className="w-full py-6 bg-gray-200">
        <div className="container px-6 md:px-16 h-full mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center md:items-start">
          <p className="text-sm text-gray-500">
            Copyright &copy; Rizal Grandonk
          </p>
          <div className="flex items-center">
            <h4 className="font-semibold mr-4">Social Media</h4>
            <div className="flex text-lg text-gray-500 space-x-3">
              <FaTwitter />
              <FaFacebook />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
