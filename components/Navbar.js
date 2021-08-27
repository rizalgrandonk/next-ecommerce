import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import {
  RiBillFill,
  RiBillLine,
  RiHome3Fill,
  RiHome3Line,
  RiLayoutMasonryFill,
  RiLayoutMasonryLine,
  RiTShirt2Fill,
  RiTShirt2Line,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Logo from "../public/logo.png";
import { useRouter } from "next/router";

const Navbar = () => {
  const [activeNavbar, setActiveNavbar] = useState(false);
  const { totalItems } = useCart();

  const router = useRouter();
  const { asPath } = router;

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
    <>
      <nav
        className={`fixed z-20 w-full h-20 text-white transition-all ${
          activeNavbar ? "bg-secondary" : ""
        }`}
      >
        <div className="container px-6 lg:px-16 h-full mx-auto flex justify-between items-center">
          <div className="h-full py-2">
            <Link href="/">
              <a className="block relative h-full w-24">
                <Image
                  src={Logo}
                  alt=""
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </a>
            </Link>
          </div>
          <div className="hidden h-full w-1/2 lg:w-2/5 md:flex items-center justify-between">
            <Link href="/">
              <a className="hover:text-primary font-medium uppercase">Home</a>
            </Link>
            <Link href="/products">
              <a className="hover:text-primary font-medium uppercase">
                Products
              </a>
            </Link>
            <Link href="/categories">
              <a className="hover:text-primary font-medium uppercase">
                Categories
              </a>
            </Link>
            <Link href="/orders">
              <a className="hover:text-primary font-medium uppercase">Orders</a>
            </Link>
          </div>
          <Link href="/cart">
            <a className="relative p-2 rounded-full hover:bg-white/10">
              <span className="text-3xl">
                <FaShoppingCart />
              </span>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 block h-5 w-5 text-sm text-center bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </a>
          </Link>
        </div>
      </nav>

      <nav
        className="md:hidden block fixed inset-x-0 -bottom-0.5 z-10 bg-white text-secondary"
        style={{ boxShadow: "0 -2px 20px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-between">
          <Link href="/">
            <a className="w-full  focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-3xl">
                {asPath == "/" ? <RiHome3Fill /> : <RiHome3Line />}
              </span>
              <span className="block text-xs">Home</span>
            </a>
          </Link>
          <Link href="/products">
            <a className="w-full  focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-3xl">
                {asPath.startsWith("/products") ? (
                  <RiTShirt2Fill />
                ) : (
                  <RiTShirt2Line />
                )}
              </span>
              <span className="block text-xs">Products</span>
            </a>
          </Link>
          <Link href="/categories">
            <a className="w-full  focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-3xl">
                {asPath.startsWith("/categories") ? (
                  <RiLayoutMasonryFill />
                ) : (
                  <RiLayoutMasonryLine />
                )}
              </span>
              <span className="block text-xs">Categories</span>
            </a>
          </Link>
          <Link href="/orders">
            <a className="w-full  focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-3xl">
                {asPath.startsWith("/orders") ? <RiBillFill /> : <RiBillLine />}
              </span>
              <span className="block text-xs">Orders</span>
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
