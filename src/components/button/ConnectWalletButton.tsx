import { setWalletConnectModalState } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import { useWallet } from "@/providers/WalletContext";
import TertiaryButton from "./TertiaryButton";

const WalletConnectButton = () => {
  const {
    isConnected,
    disconnect
  } = useWallet();

  const dispatch = useDispatch();
  const handleOpenWalletModal = () => {
    dispatch(setWalletConnectModalState(true));
  }; 

  return (
    <TertiaryButton onClick={!isConnected ? handleOpenWalletModal : disconnect} classNames="w-full">
      {isConnected ? "Disconnect" : "Connect Wallet"}
    </TertiaryButton>
  );
};

export default WalletConnectButton;
