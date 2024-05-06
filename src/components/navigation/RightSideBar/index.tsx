/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@/providers/WalletContext";
import { setSelectedMessageUser } from "@/store/appSlice";
import { numberWithCommas } from "@/utils/number";
import Decimal from "decimal.js"; 
import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Followers from "./Followers";
const LazyWalletConnectButton = lazy(
  () => import("@/components/button/ConnectWalletButton")
);

interface RightSideBarProps {
  menu: any;
}

const RightSideBar = ({menu}: RightSideBarProps) => {
  const { isConnected, disconnect, adaBalance, stakeAddress } = useWallet();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { allUsers, selectedMessageUser } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const handleClickUser = ( user: any ) => {
    dispatch(setSelectedMessageUser(user));
  }

  return (
    <div className=" h-full md:w-[330px] w-full bg-gradient-to-b from-black via-back3 to-black py-6">
      <img alt="circle" src="/img/logo.png" className="w-full px-6" />
      { menu !== "Messages" ? <div className="w-full px-6">
        <LazyWalletConnectButton />
        {isConnected && (
          <div>
            <div className="my-2">Balance: { "" + numberWithCommas(new Decimal(adaBalance).dividedBy(Math.pow(10, 6)).toNumber().toFixed(2))}&nbsp;₳</div>
          </div>
        )}
        <Followers/>
      </div> : <div className="">
        { userInfo.contacts && userInfo.contacts.map((id: string) => {
          const userIndex = allUsers.findIndex((u: any) => u._id == id);
          if(userIndex == -1){
            return;
          }
          const user = allUsers[userIndex];
          return (<div key={id}>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-primary p-2 mx-4" onClick={() => handleClickUser(user)}>
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : "/img/avatar/default.png"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-front border-2 object-cover"
                />
                <div className={`${selectedMessageUser && selectedMessageUser._id == user._id && "text-primary"}`}>{user.username}</div>
              </div>
          </div>);
        }) }
      </div> }
    </div>
  );
};

export default RightSideBar;
