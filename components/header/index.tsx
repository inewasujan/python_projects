"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MenuOpenIcon, MenuCloseIcon } from "@/lib/icons";

export default function NileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-1 hover:cursor-pointer font-bold uppercase text-4xl tracking-tighter text-indigo-800 py-5">
            Gandaki
          </div>
        </Link>
        {/* Menu icon (visible on small screens) */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            {menuOpen ? (
              <MenuCloseIcon
                fill="#000"
                height={24}
                width={24}
                className="mt-1"
              />
            ) : (
              <MenuOpenIcon
                fill="#000"
                height={24}
                width={24}
                className="mt-1"
              />
            )}
          </button>
        </div>

        {/* Menu links (visible on medium and large screens) */}
        <nav className="hidden sm:flex space-x-10 items-center gap-3">
          <Link href="/" className="text-black hover:text-gray-500">
            Home
          </Link>
          <Link href="/about" className="text-black hover:text-gray-500">
            About Us
          </Link>
          <Link href="/services" className="text-black hover:text-gray-500">
            Services
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="hover:bg-indigo-600 hover:text-white hover:border-indigo-600">Book Now</Button>
          </Link>
        </nav>
      </div>

      {/* Mobile menu (hidden by default) */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="py-7 px-4 mt-5 space-y-2 bg-zinc-100">
            <Link href="/" className="block">
              Home
            </Link>
            <Link href="/about" className="block">
              About Us
            </Link>
            <Link href="/contact" className="block">
              Services
            </Link>
            <Button>Book Now</Button>
          </div>
        </div>
      )}
    </div>
  );
}
