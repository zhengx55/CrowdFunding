import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";

type Props = {
  labelName: string;
  placeholder: string;
  inputType?: "text" | "number" | "email" | "password" | "date" | "url";
  isTextArea?: boolean;
  value: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const FormField = (props: Props) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {props.labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-slate-200 mb-[10px]">
          {props.labelName}
        </span>
      )}
      {props.isTextArea ? (
        <textarea
          required
          rows={10}
          onChange={props.handleChange}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-md sm:min-w-[300px]"
        />
      ) : (
        <Input
          type={props.inputType}
          required
          aria-autocomplete="list"
          onChange={props.handleChange}
          step="0.1"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-md sm:min-w-[300px]"
          placeholder={props.placeholder}
        />
      )}
    </label>
  );
};

export default FormField;
