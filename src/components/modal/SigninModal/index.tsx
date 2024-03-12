import Image from "next/image";
import React from "react";
import TextInput from "../../input/TextInput";
import PrimaryButton from "../../button/PrimaryButton";
import SecondaryButton from "../../button/SecondaryButton";
import { forgotPassword, login } from "@/apis/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthState, setUserInfo } from "@/store/authSlice";
import { useRouter } from 'next/navigation';

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SigninModal: React.FC<SigninModalProps> = ({ isOpen, onClose }) => {
  const [userid, setUserid] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const handlePreventCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const onLogin = async () => {
    const data = await login(userid, password);
    if(!data.success){
        toast.error(data.message);
    } else {
        toast.success("You are now ready to use.");
        dispatch(setAuthState(true));
        dispatch(setUserInfo(data.user));
        router.push("/timeline");
        onClose();
    }
  }

  const onForgotPassword = async () => {
    const data = await forgotPassword(userid);
    if(!data.success){
      toast.error(data.message);
    } else {
      toast.success("We've send the updated password to your email!");
    }
  }

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
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          className="m-auto"
          src="/img/logo.svg"
          alt="logo"
          height={250}
          width={250}
        />
        <div className="text-3xl font-bold text-left w-full">
          Sign in to Circle
        </div>
        <div className="w-full flex flex-col gap-4 mt-4 mb-4">
            <TextInput
                type="text"
                placeholder="Email or Username"
                setValue={setUserid}
                value={userid}
            />
            <TextInput
                type="password"
                placeholder="Password"
                setValue={setPassword}
                value={password}
            />
            <PrimaryButton onClick={onLogin}>Enter Circle</PrimaryButton>
        </div>
        <div className="w-full text-left mt-4 mb-4">Did you forget your password?</div>
        <div className="w-full">
            <SecondaryButton classNames="" onClick={onForgotPassword}>Forgot Password</SecondaryButton>
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default SigninModal;
