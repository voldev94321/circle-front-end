"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SelectUserModal from "@/components/modal/SelectUserModal";
import CardView from "@/components/view/CardView";
import React from "react";

interface NewMessageProps {
  allUsers: any;
  setCurrentUser: any;
}

const NewMessage = ({ allUsers, setCurrentUser }: NewMessageProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleCreate = () => {
    setIsOpenModal(true);
  };

  return (
    <CardView>
      <div className="text-xl font-bold my-2">
        Select a <span className="text-primary">message</span>
      </div>
      <div className="my-2">
        Select an existing conversation or start a new one.
      </div>
      <PrimaryButton classNames="my-2" onClick={handleCreate}>
        Create New Message
      </PrimaryButton>
      <SelectUserModal
        isOpen={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false);
        }}
        users={allUsers}
        setCurrentUser={setCurrentUser}
      />
    </CardView>
  );
};

export default NewMessage;
