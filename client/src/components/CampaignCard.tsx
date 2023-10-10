import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { Campaign } from "../context";
type Props = {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
};
const DisplayCampaigns: FC<Props> = ({ title, isLoading, campaigns }) => {
  const router = useRouter();
  const handleNavigate = (campaign: Campaign) => {
    const campaingData = JSON.stringify(campaign);
    router.push({
      pathname: `/detail/[pid]`,
      query: {
        pid: campaign.pId,
        campaign: campaingData,
      },
    });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
