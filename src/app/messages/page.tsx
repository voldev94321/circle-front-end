/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLayout from "@/components/navigation/MainLayout";
import React from "react";
import NewMessage from "./NewMessage";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessageUser } from "@/store/appSlice";

const MessagesPage = () => {
  const { allUsers } = useSelector((state: any) => state.app);
  const [currentUser, setCurrentUser] = React.useState<any>({});
  const { selectedMessageUser } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setCurrentUser({});
    dispatch(setSelectedMessageUser(null));
  }, []);

  React.useEffect(() => {
    setCurrentUser(selectedMessageUser);
  }, [selectedMessageUser]);

  return (
    <MainLayout menu="Messages">
      {(currentUser == null || currentUser._id == undefined) ? (
        <NewMessage allUsers={allUsers} setCurrentUser={setCurrentUser} />
      ) : (
        <MessageBox user={currentUser}/>
      )}
    </MainLayout>
  );
};

export default MessagesPage;
