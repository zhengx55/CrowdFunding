import { NextPage } from "next";

import Layout from "../src/components/Layout";
import { useEffect, useState } from "react";
import { useStateContext } from "../src/context";
import CampaignCard from "../src/components/CampaignCard";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <Layout>
      <CampaignCard
        title="All campaigns"
        campaigns={campaigns}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default Home;
