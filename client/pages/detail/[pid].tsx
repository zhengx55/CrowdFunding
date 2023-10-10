import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { calculateBarPercentage, daysLeft } from "../../src/utils";
import { useRouter } from "next/router";
import { Campaign, useStateContext } from "../../src/context";
import CountBox from "../../src/components/CountBox";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { thirdweb } from "../../src/assets";
import Layout from "../../src/components/Layout";
import { Button } from "../../src/components/ui/button";

const CampaignDetails = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { donate, getDonations, contract, address, getCampaign } =
    useStateContext();
  const [campaign, setCampaign] = useState<Campaign>();
  const fetchCampaign = async () => {
    const data = await getCampaign(pid);
    setCampaign(data);
  };
  useEffect(() => {
    if (contract) fetchCampaign();
  }, [contract, address]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<any>([]);

  const remainingDays = 1;

  // const fetchDonators = async () => {
  //   const data = await getDonations(campaign.pId);
  //   setDonators(data);
  // };

  // useEffect(() => {
  //   if (contract) fetchDonators();
  // }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(pid, amount);
    router.push("/");
    setIsLoading(false);
  };
  if (!campaign) return null;

  return (
    <Layout>
      {isLoading && <Loader2 className="w-5 h-5 animate-spin text-slate-300" />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <Image
            src={campaign.image!}
            alt="campaign"
            width={100}
            height={100}
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  campaign.target,
                  campaign.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] items-center w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${campaign.target}`}
            value={campaign.amountCollected as string}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <Image
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {campaign.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {campaign.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[#8c6dfd] w-full"
              >
                Fun This Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
