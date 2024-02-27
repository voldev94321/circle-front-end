import Image from "next/image";
import React from "react";
import EnterDetails from "./EnterDetails";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
    const [progress, setProgress] = React.useState(0);

  const handlePreventCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    isOpen ? <div
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-transparent"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-3xl bg-back2 p-12 pt-0 w-[40rem]"
        onClick={(e) => handlePreventCloseModal(e)}
      >
        <div className="relative w-full">
            <Image className="m-auto" src="/img/logo.svg" alt="logo" height={100} width={100} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[12px] bg-back2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">The Future of Decentralized Communication Awaits</div> 
        </div>
        <div className="w-full flex justify-between relative">
            <div className="w-8 h-8 bg-primary rounded-full z-10"></div>
            <div className="w-8 h-8 bg-front rounded-full z-10"></div>
            <div className="w-8 h-8 bg-front rounded-full z-10"></div>
            <div className="absolute w-1/2 h-0.5 bg-primary z-0 top-1/2 transform -translate-y-1/2 left-0"></div>
            <div className="absolute w-1/2 h-0.5 bg-front z-0 top-1/2 transform -translate-y-1/2 right-0"></div>
        </div>
        <div className="w-full flex justify-between relative">
            <div>Enter Details</div>
            <div>Accept Rules</div>
            <div>Confirm Email</div>
        </div>

        <div className="text-3xl mt-4">
            Let’s get you set up on <span className="text-primary font-bold">Circle</span>.
        </div>
        <div>With an account on this Circle server, you’ll be able to follow any other person on the network, regardless of where their account is hosted.</div>

        <div className="mt-4 w-full">
          <EnterDetails/>
        </div>
      </div>
    </div> : <></>
  );
};

export default SignupModal;
