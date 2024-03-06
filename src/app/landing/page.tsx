'use client';
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import LandingFooter from "../../components/navigation/footer";
import SignupModal from "@/components/modal/SignupModal";
import React, { lazy } from "react";
import Image from "next/image";
import SigninModal from "@/components/modal/SigninModal";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import WalletConnectButton from "@/components/button/ConnectWalletButton";
import { useWallet } from "@/providers/WalletContext";
const LazyLandingHeader = lazy(() => import("../../components/navigation/header"));
const LazyWalletConnectButton = lazy(() => import ("../../components/button/ConnectWalletButton"));

const LandingPage = () => {
  const [isSignupModalOpen, setSignupModalOpen] = React.useState(false);
  const [isSigninModalOpen, setSigninModalOpen] = React.useState(false);
  const {authState} = useSelector((state: any) => state.auth);
  const router = useRouter();
  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  const openSigninModal = () => {
    setSigninModalOpen(true);
  };

  const closeSigninModal = () => {
    setSigninModalOpen(false);
  };

  React.useEffect(() => {
    if(authState){
      // router.push("/dashboard");
    }
  }, [authState]);

  // return !authState && (
  return (
    <div>
      <LazyLandingHeader />
      <div className="flex justify-center items-center h-screen">
        <div className="md:gap-8 flex flex-col md:flex-row h-screen">
          <Image src="/img/logo.svg" alt="logo" height={500} width={500} />
          <div className="flex justify-center items-center md:h-screen">
            <div className="p-4 rounded-lg flex gap-8">
              <div>
                <div className="text-xl md:text-5xl font-bold text-center md:h-fit mb-10">
                  Uniting the world through <br />
                  <span className="text-primary">decentralized</span>{" "}
                  connections
                </div>
                <div className="md:hidden"><LazyWalletConnectButton/></div>
                <div className="fixed md:static bottom-10">
                  <SecondaryButton onClick={openSignupModal}>Join Today</SecondaryButton>
                  <div className="mt-4 mb-10 hidden md:block">
                    By signing up, you agree to the Terms of Service and Privacy
                    Policy.
                  </div>
                  <div className="mt-4 mb-4 text-xl">
                    Already have an account?
                  </div>
                  <PrimaryButton classNames="bg-opacity-40" onClick={openSigninModal}>Enter Circle</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} openSignInModal={openSigninModal} />
      <SigninModal isOpen={isSigninModalOpen} onClose={closeSigninModal} />
    </div>
  );
};

export default LandingPage;
