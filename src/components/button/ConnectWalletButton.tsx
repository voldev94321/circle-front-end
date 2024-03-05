import { setWalletConnectModalState } from "@/store/modalSlice";
import PrimaryButton from "./PrimaryButton";
import { useDispatch } from "react-redux";

const WalletConnectButton = () => {
  const dispatch = useDispatch();
  const handleOpenWalletModal = () => {
    dispatch(setWalletConnectModalState(true));
  };
  return (
    <PrimaryButton onClick={handleOpenWalletModal}>
      Connect Wallet
    </PrimaryButton>
  );
};

export default WalletConnectButton;
