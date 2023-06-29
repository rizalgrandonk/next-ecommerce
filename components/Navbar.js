import { useCart } from "@/contexts/CartContext";
import { localize } from "@/lib/formater";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  RiBillFill,
  RiBillLine,
  RiHome3Fill,
  RiHome3Line,
  RiLayoutMasonryFill,
  RiLayoutMasonryLine,
  RiShoppingCartLine,
  RiTShirt2Fill,
  RiTShirt2Line,
} from "react-icons/ri";

const Navbar = () => {
  const [activeNavbar, setActiveNavbar] = useState(false);
  const { totalItems } = useCart();

  const { asPath, locale } = useRouter();

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
        className={`fixed z-20 w-full h-16 md:h-20 text-white transition-all ${
          activeNavbar ? "bg-secondary" : ""
        }`}
      >
        <div className="container px-6 lg:px-16 h-full mx-auto flex justify-between items-center">
          <div className="h-full py-1.5">
            <Link href="/">
              <a className="block relative h-full w-24">
                <Image
                  src="/logo.png"
                  alt=""
                  placeholder="blur"
                  blurDataURL="/logo.png"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </a>
            </Link>
          </div>
          <div className="hidden h-full w-1/2 lg:w-2/5 lg:flex items-center justify-between">
            <Link href="/">
              <a className="hover:text-primary font-medium uppercase">
                {localize(locale, "home")}
              </a>
            </Link>
            <Link href="/products">
              <a className="hover:text-primary font-medium uppercase">
                {localize(locale, "products")}
              </a>
            </Link>
            <Link href="/categories">
              <a className="hover:text-primary font-medium uppercase">
                {localize(locale, "categories")}
              </a>
            </Link>
            <Link href="/orders">
              <a className="hover:text-primary font-medium uppercase">
                {localize(locale, "orders")}
              </a>
            </Link>
          </div>

          <div className="flex justify-between items-center gap-6">
            <Link href="/cart">
              <a className="hidden lg:inline relative p-2 rounded-full hover:bg-white/10">
                <span className="text-4xl">
                  <RiShoppingCartLine />
                </span>
                {totalItems > 0 && (
                  <span className="absolute right-0 top-1 block h-5 w-5 text-sm text-center bg-red-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </a>
            </Link>

            <div className="flex justify-between items-center">
              <Link href="/" locale="en">
                <a
                  className={`px-3 py-1 uppercase border border-white md:text-xl font-medium ${
                    locale == "en" ? "text-secondary bg-white" : ""
                  }`}
                >
                  en
                </a>
              </Link>
              <Link href="/" locale="id">
                <a
                  className={`px-3 py-1 uppercase border border-white md:text-xl font-medium ${
                    locale == "id" ? "text-secondary bg-white" : ""
                  }`}
                >
                  id
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className="lg:hidden block fixed inset-x-0 -bottom-0.5 z-10 bg-white text-secondary"
        style={{ boxShadow: "0 -2px 20px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-between">
          <Link href="/">
            <a className="w-full focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-2xl">
                {asPath == "/" ? <RiHome3Fill /> : <RiHome3Line />}
              </span>
              <span className="block text-xs">{localize(locale, "home")}</span>
            </a>
          </Link>
          <Link href="/products">
            <a className="w-full focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-2xl">
                {asPath.startsWith("/products") ? (
                  <RiTShirt2Fill />
                ) : (
                  <RiTShirt2Line />
                )}
              </span>
              <span className="block text-xs">
                {localize(locale, "products")}
              </span>
            </a>
          </Link>

          <div className="w-full flex flex-col justify-center items-center">
            <Link href="/cart">
              <a className="w-16 h-16 bg-secondary rounded-full flex justify-center items-center absolute bottom-2 left-1/2 -translate-x-1/2 hover:bg-opacity-95 focus:bg-opacity-95">
                <span className="text-4xl text-white relative focus:text-primary hover:text-primary">
                  <RiShoppingCartLine />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 px-1.5 py-0.5 text-xs text-center bg-red-600 rounded-full text-white">
                      {totalItems}
                    </span>
                  )}
                </span>
              </a>
            </Link>
          </div>

          <Link href="/categories">
            <a className="w-full focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-2xl">
                {asPath.startsWith("/categories") ? (
                  <RiLayoutMasonryFill />
                ) : (
                  <RiLayoutMasonryLine />
                )}
              </span>
              <span className="block text-xs">
                {localize(locale, "categories")}
              </span>
            </a>
          </Link>
          <Link href="/orders">
            <a className="w-full focus:text-primary hover:text-primary flex flex-col justify-between items-center py-2">
              <span className="text-2xl">
                {asPath.startsWith("/orders") ? <RiBillFill /> : <RiBillLine />}
              </span>
              <span className="block text-xs">
                {localize(locale, "orders")}
              </span>
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
