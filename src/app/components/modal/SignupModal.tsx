import React from "react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login with username:", username, "and password:", password);
    onClose(); // Close the modal after login
  };

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
        className="flex w-[60rem] flex-col items-center gap-3 rounded-lg bg-back p-10"
        onClick={(e) => handlePreventCloseModal(e)}
      >
        <h1 className="text-4xl font-semibold">asdf</h1>
        <div className="mb-2 flex h-fit w-full p-0">asdfasdf</div>
      </div>
    </div> : <></>
  );
};

export default SignupModal;
