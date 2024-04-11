/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";

interface SelectUserModalProps {
  isOpen: boolean;
  handleClose: any;
  users: any;
  setCurrentUser: any;
}

const SelectUserModal = ({
  isOpen,
  handleClose,
  users,
  setCurrentUser,
}: SelectUserModalProps) => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const onClose = () => {
    console.log(users);
    handleClose();
  };

  const handleClickUser = (user: any) => {
    handleClose();
    setCurrentUser(user);
  }

  React.useEffect(() => {}, [users]);

  return isOpen ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-90"
      onMouseDown={() => {
        onClose();
      }}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-3xl md:bg-back bg-back w-[40rem] h-full md:h-fit border-primary border-2 overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full m-4">
          {users && users.map((user: any, index: number) => (
            (user.username != userInfo.username) && <div key={index}>
              <div className="flex items-center gap-2 my-2 cursor-pointer hover:bg-primary px-2" onClick={() => handleClickUser(user)}>
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : "/img/avatar/default.png"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-2xl border-front border-2 object-cover"
                />
                <div>{user.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default SelectUserModal;
