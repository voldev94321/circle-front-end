import Image from "next/image";
import React from "react";
import EnterDetails from "./EnterDetails";
import AcceptRules from "./AcceptRules";
import ConfirmEmail from "./ConfirmEmail";
import { sendEmailVerificationCode, signUp } from "@/apis/auth";
import { toast } from "react-toastify";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignInModal: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, openSignInModal }) => {
  const [progress, setProgress] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handlePreventCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const onSignup = ( username: string, email: string, password: string) => {
    setUsername(username);
    setEmail(email);
    setPassword(password);

    setProgress(1);
  }

  const onAgreeTerms = async () => {
    const result = await sendEmailVerificationCode(email);
    if(result.success){
      toast.info('We sent 6-digit codes to your email.');
      setProgress(2);
    } else {
      toast.error("Unkown Error!");
    }
  }

  const onConfirmEmail = async () => {
    const signUpResult = await signUp(email, username, password);
    if(signUpResult.success){
      toast.success("Successfully registered!");
      onClose();
      openSignInModal();
    } else {
      toast.error(signUpResult.message);
    }
  }

  React.useEffect(() => {
    if(isOpen){
      setProgress(0);
    }
  }, [isOpen]);

  React.useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      // Add event listener when the modal is open
      document.addEventListener('keydown', handleKeyDown);
    } else {
      // Remove event listener when the modal is closed
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      // Cleanup function: remove event listener when component unmounts
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  return isOpen ? (
    <div
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-transparent"
      onMouseDown={() => {
        onClose();
      }}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-3xl md:bg-back2 bg-back p-12 pt-0 w-[40rem] h-full md:h-fit"
        onClick={(e) => handlePreventCloseModal(e)}
        onMouseDown={e=>{
          e.stopPropagation();
        }}
      >
        <div className="relative w-full">
          <Image
            className="m-auto"
            src="/img/logo.png"
            alt="logo"
            height={100}
            width={100}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[12px] md:bg-back2 bg-back"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-xs md:text-lg">
            The Future of Decentralized Communication Awaits
          </div>
        </div>
        <div className="w-full flex justify-between relative">
          <div onClick={() => {setProgress(0)}} className="w-6 h-6 cursor-pointer bg-primary rounded-full z-10"></div>
          <div onClick={() => {progress > 0 && setProgress(1)}} className={`w-6 h-6 cursor-pointer ${ progress > 0 ? "bg-primary" : "bg-front"} rounded-full z-10`}></div>
          <div onClick={() => {progress > 1 && setProgress(2)}} className={`w-6 h-6 cursor-pointer ${ progress > 1 ? "bg-primary" : "bg-front"} rounded-full z-10`}></div>
          <div className={`absolute w-1/2 h-0.5 ${ progress > 0 ? "bg-primary" : "bg-front"} z-0 top-1/2 transform -translate-y-1/2 left-0`}></div>
          <div className={`absolute w-1/2 h-0.5 ${ progress > 1 ? "bg-primary" : "bg-front"} z-0 top-1/2 transform -translate-y-1/2 right-0`}></div>
        </div>
        <div className="w-full flex justify-between relative">
          <div className="text-primary">Enter Details</div>
          <div className={`${ progress > 0 && "text-primary" } text-center`}>Accept Rules</div>
          <div className={`${ progress > 1 && "text-primary" } text-right`}>Confirm Email</div>
        </div>

        <div className="text-3xl mt-4">
          Let’s get you set up on{" "}
          <span className="text-primary font-bold">Circle</span>.
        </div>
        <div>
          With an account on this Circle server, you’ll be able to follow any
          other person on the network, regardless of where their account is
          hosted.
        </div>

        <div className="mt-4 w-full">
          <div className={`${progress != 0 && "hidden"}`}><EnterDetails onSubmit={onSignup}/></div>
          <div className={`${progress != 1 && "hidden"}`}><AcceptRules onSubmit={onAgreeTerms}/></div>
          <div className={`${progress != 2 && "hidden"}`}><ConfirmEmail email={email} onSubmit={onConfirmEmail}/></div>
        </div>
        <div className="h-full text-center flex items-end md:hidden">
          © 2024 Circle
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default SignupModal;
