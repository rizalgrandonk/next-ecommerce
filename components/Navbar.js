import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../public/logo.png";
import { useEffect, useState } from "react";

const Navbar = ({ categories }) => {
  const cart = 0;
  const [activeNavbar, setActiveNavbar] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 30) {
      setActiveNavbar(true);
    } else {
      setActiveNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <nav
      className={`fixed z-20 w-full h-16 text-white transition-all ${
        activeNavbar ? "bg-secondary" : ""
      }`}
    >
      <div className="container px-6 md:px-16 h-full mx-auto flex justify-between items-center">
        <div className="h-full py-2">
          <Link href="/">
            <a className="block relative h-full w-20">
              <Image
                src={Logo}
                alt=""
                layout="fill"
                objectFit="contain"
                quality={100}
              />
            </a>
          </Link>
        </div>
        <div className="hidden h-full w-1/4 md:flex items-center justify-between">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <a className="hover:text-primary font-medium uppercase">
                {category.name}
              </a>
            </Link>
          ))}
        </div>
        <Link href="/cart">
          <a className="relative text-3xl">
            <FaShoppingCart />
            {cart > 0 && (
              <span className="absolute -right-1 -top-1 block h-5 w-5 text-sm text-center bg-red-600 rounded-full">
                {cart}
              </span>
            )}
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
