import { NextPage } from "next";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";

const Home: NextPage = () => {
  return (
    <main className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
      </div>
    </main>
  );
};

export default Home;
