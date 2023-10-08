import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../src/components/Layout";
import { Loader2 } from "lucide-react";

type Props = {};

const Create: NextPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const handleSubmit = () => {

  };
  return (
    <Layout>
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Start a Campaign
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
            
        </div>
      </form>
    </Layout>
  );
};

export default Create;
