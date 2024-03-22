import { useWallet } from "@/providers/WalletContext";
import Decimal from "decimal.js";
import Image from "next/image";
import React, { lazy } from "react";
const LazyWalletConnectButton = lazy(
  () => import("@/components/button/ConnectWalletButton")
);

const RightSideBar = () => {
  const { isConnected, disconnect, adaBalance, stakeAddress } = useWallet();

  return (
    <div className=" h-full md:w-[330px] w-full bg-gradient-to-b from-black via-back3 to-black p-6">
      <Image alt="circle" src="/img/logo.svg" width={300} height={300} />
      <div className="w-full">
        <LazyWalletConnectButton />
        {isConnected && (
          <div>
            <div className="my-4">Balance: { "" + new Decimal(adaBalance).dividedBy(Math.pow(10, 6)).toNumber().toFixed(2)}&nbsp;₳</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
