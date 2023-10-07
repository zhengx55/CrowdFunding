import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../src/components/Layout";

type Props = {};

const Create: NextPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Layout>
      <main></main>
    </Layout>
  );
};

export default Create;
