"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

export default function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname?.includes("/photos") ||
    pathname?.includes("/reserve") ||
    pathname?.includes("/auth");

  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col bg-[#FCFBF7]">
        {/* {!hideLayout && <Navbar />} */}

        <main className={`flex flex-col ${!hideLayout ? "pt-20" : ""}`}>
          {children}
        </main>

        {/* {!hideLayout && <Footer />} */}
      </div>
    </SessionProvider>
  );
}
