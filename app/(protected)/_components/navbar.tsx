"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="container bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/about/list" ? "default" : "outline"}
        >
          <Link href="/about/list">Current Aboutus</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/about/create" ? "default" : "outline"}
        >
          <Link href="/about/create">Create New Aboutus</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/services/list" ? "default" : "outline"}
        >
          <Link href="/services/list">Services List</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/services/create" ? "default" : "outline"}
        >
          <Link href="/services/create">Create a Service</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
