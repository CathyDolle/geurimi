"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    return pathname === path;
  };

  return (
    <>
      <section className="lg-max:hidden lg:fixed flex flex-col justify-between top-0 span-p-1-wider left-0 z-50 bg-white text-black span-w-4-wider text-12 leading-near h-full">
        {/* Intro infos */}
        <div className="flex flex-col gap-32">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <h1 className="text-16 uppercase">Geurimi coffee</h1>
          <p className="opacity-80">
            🎨 A good place where to draw
            <br />
            ☕️ Korean pastries and drinks
            <br />
            <br />
            Wednesday to Friday
            <br />
            9h30-18h30 <br />
            <br />
            Saturday & Sunday
            <br />
            10h30-18h30
          </p>
          <Link
            href="https://www.instagram.com/geurimi_cafe/"
            target="_blank"
            className="uppercase underline"
          >
            Instagram
          </Link>
          <nav className="flex flex-row  justify-center items-center span-w-2 text-11 gap-8 border border-black/20 p-16">
            <Link
              href="/"
              className={`uppercase ${
                isActive("/") ? "opacity-100" : "opacity-50 hover:opacity-100"
              } duration-300`}
            >
              About
            </Link>
            <span>|</span>
            <Link
              href="/menu"
              className={`uppercase ${
                isActive("/menu")
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100"
              } duration-300`}
            >
              Menu
            </Link>
            <span>|</span>
            <Link
              href="/contact"
              className={`uppercase ${
                isActive("/contact")
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100"
              } duration-300`}
            >
              Contact
            </Link>
          </nav>
        </div>
        {/* adress */}
        <div className="flex flex-col gap-8">
          <span>커피</span>
          <p className="opacity-80">
            11 rue des Écouffes,
            <br />
            Paris, France 75004
          </p>
        </div>
      </section>
      <section className="lg:hidden">
        <header className="flex justify-between items-center margin-p-1">
          <Link href="/">
            <Image className="span-w-1" src={logo} alt="logo" />
          </Link>
          <Link
            href="https://www.instagram.com/geurimi_cafe/"
            target="_blank"
            className="uppercase text-12 underline"
          >
            Instagram
          </Link>
        </header>
        <nav className="flex flex-row fixed margin-bottom-1 z-100 bg-white justify-center items-center span-w-6 margin-mx-1 text-11 gap-8 border border-black/20 p-16">
          <Link
            href="/"
            className={`uppercase ${
              isActive("/") ? "opacity-100" : "opacity-50 hover:opacity-100"
            } duration-300`}
          >
            About
          </Link>
          <span>|</span>
          <Link
            href="/menu"
            className={`uppercase ${
              isActive("/menu") ? "opacity-100" : "opacity-50 hover:opacity-100"
            } duration-300`}
          >
            Menu
          </Link>
          <span>|</span>
          <Link
            href="/contact"
            className={`uppercase ${
              isActive("/contact")
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            } duration-300`}
          >
            Contact
          </Link>
        </nav>
      </section>
    </>
  );
};
