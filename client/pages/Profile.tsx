import React, { useState, useEffect } from "react";
import { useStateContext } from "../src/context";
import CampaignCard from "../src/components/CampaignCard";
import Layout from "../src/components/Layout";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <Layout>
      <CampaignCard
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Layout>
  );
};

export default Profile;
