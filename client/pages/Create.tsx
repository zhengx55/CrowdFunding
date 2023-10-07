import { NextPage } from "next";
import React, { useState } from "react";

type Props = {};

const Create: NextPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return <div>Create</div>;
};

export default Create;
