/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import TransparentInput from "@/components/input/TransparentInput";
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
  const [search, setSearch] = React.useState("");

  const onClose = () => {
    handleClose();
  };

  const handleClickUser = (user: any) => {
    handleClose();
    setCurrentUser(user);
  };

  React.useEffect(() => {}, [users]);

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
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-90"
      onMouseDown={() => {
        onClose();
      }}
    >
      <div
        className="flex flex-col items-center rounded-3xl md:bg-back bg-back w-[40rem] h-[500px] border-primary border-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full px-2">
          <div className="flex-grow flex p-1 rounded-2xl bg-front bg-opacity-10 items-center px-4 w-full mt-2">
            <div className="flex-grow ">
              <TransparentInput
                placeholder="Search here..."
                value={search}
                setValue={setSearch}
                type="text"
                onKeyDown={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="w-full m-2 overflow-auto">
          <div className="">
            {users &&
              users
                .filter(
                  (v: any) =>
                    v.username.includes(search) || v.circlename.includes(search)
                )
                .map(
                  (user: any, index: number) =>
                    user.username != userInfo.username && (
                      <div key={index}>
                        <div
                          className="flex items-center gap-2 my-2 cursor-pointer hover:bg-primary px-2"
                          onClick={() => handleClickUser(user)}
                        >
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
                    )
                )}
          </div>
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default SelectUserModal;
