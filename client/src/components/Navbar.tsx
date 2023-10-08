import React, { useState } from "react";
// import { useStateContext } from "../context";
import { logo, menu, search, thirdweb } from "../assets";
import Image from "next/image";
import Link from "next/link";
import { navlinks } from "../constant";
import { Button } from "./ui/button";
import { useStateContext } from "../context";
import { Router, useRouter } from "next/router";
import { cn } from "../utils";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const Navbar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const router = useRouter();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] gap-x-2 py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <Input
          type="text"
          placeholder="Search for campaigns"
          className="font-epilogue text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none border-0"
        />

        <div className="w-[72px] hover:animate-in h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <Search className="w-[15px] text-white h-[15px] object-contain" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4 items-center">
        <Button
          className={cn(
            address ? " bg-green-400" : "bg-[#2c2f32]",
            "text-zinc-200 text-[18px]"
          )}
          onClick={() => {
            if (address) router.push("/create");
            else connect();
          }}
        >
          {address ? "Create a campaign" : "Connect"}
        </Button>

        <Link href="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <Image
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Image
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <Image
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <Link
                href={link.link}
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                }}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </Link>
            ))}
          </ul>

          <div className="flex mx-4">
            <Button
              className={cn(address ? " bg-green-400" : "bg-slate-300")}
              onClick={() => {
                if (address) router.push("/create");
                else connect();
              }}
            >
              {address ? "Create a campaign" : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
