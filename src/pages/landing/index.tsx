'use client';
import PrimaryButton from "@/app/components/button/PrimaryButton";
import LandingHeader from "./header";
import SecondaryButton from "@/app/components/button/SecondaryButton";
import LandingFooter from "./footer";
import SignupModal from "@/app/components/modal/SignupModal";
import React from "react";
import Image from "next/image";

const LandingPage = () => {
  const [isSignupModalOpen, setSignupModalOpen] = React.useState(false);

  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  return (
    <div>
      <LandingHeader />
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
                <div className="fixed md:static bottom-10">
                  <SecondaryButton onClick={openSignupModal}>Join Today</SecondaryButton>
                  <div className="mt-4 mb-10 hidden md:block">
                    By signing up, you agree to the Terms of Service and Privacy
                    Policy.
                  </div>
                  <div className="mt-4 mb-4 text-xl">
                    Already have an account?
                  </div>
                  <PrimaryButton classNames="bg-opacity-40">Enter Circle</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </div>
  );
};

export default LandingPage;
