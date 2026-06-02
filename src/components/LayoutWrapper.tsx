"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  return (
    <>
      {!isAdmin && <Navbar />}
      <div className="flex-grow">
        {children}
      </div>
      {!isAdmin && <Footer />}
    </>
  );
}
