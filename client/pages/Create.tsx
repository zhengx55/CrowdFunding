import { NextPage } from "next";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Layout from "../src/components/Layout";
import { CircleDollarSign, Loader2 } from "lucide-react";
import FormField from "../src/components/FormField";
import { useStateContext } from "../src/context";
import { money } from "../src/assets";
import { Button } from "../src/components/ui/button";
import { checkIfImage } from "../src/utils";
import { ethers } from "ethers";
import { useRouter } from "next/router";

type Props = {};

const Create: NextPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createCampaign } = useStateContext();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        router.back();
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <Layout>
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        <h1 className="font-epilogue font-bold sm:text-3xl text-2xl leading-[38px] text-white">
          Start a Campaign
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
            />
            <FormField
              labelName="Campaign Title *"
              placeholder="Write a title"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
          </div>

          <FormField
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />

          <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
            <CircleDollarSign className="w-[40px] h-[40px]" />
            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
              You will get 100% of the raised amount
            </h4>
          </div>

          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
            />
          </div>

          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <Button type="submit" className="bg-[#1dc071]">
              Submit new campaign
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
