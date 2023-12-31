import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <main className="relative sm:-8 p-4 bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default Layout;
