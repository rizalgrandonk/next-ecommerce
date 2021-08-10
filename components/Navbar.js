import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../public/icon.png";
import { useEffect, useState } from "react";

const Navbar = ({ categories }) => {
  const cart = 0;
  const [activeNavbar, setActiveNavbar] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 64) {
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
      className={`fixed w-full h-16 px-16 text-white transition-all ${
        activeNavbar ? "bg-gray-700 " : ""
      }`}
    >
      <div className="container h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="block relative h-full w-24 ">
            <Image
              src={Logo}
              alt=""
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </a>
        </Link>
        <div className="h-full w-1/4 flex items-center justify-between">
          {categories.map((category) => (
            <Link key={category.slug} href={`category/${category.slug}`}>
              <a className="hover:text-gray-300">{category.name}</a>
            </Link>
          ))}
        </div>
        <Link href="cart">
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
