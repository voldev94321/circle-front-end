import { setWalletConnectModalState } from "@/store/modalSlice";
import PrimaryButton from "./PrimaryButton";
import { useDispatch } from "react-redux";
import { useWallet } from "@/providers/WalletContext";

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
    <PrimaryButton onClick={!isConnected ? handleOpenWalletModal : disconnect}>
      {isConnected ? "Disconnect" : "Connect Wallet"}
    </PrimaryButton>
  );
};

export default WalletConnectButton;
