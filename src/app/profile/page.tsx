/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainLayout from "@/components/navigation/MainLayout";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileMain from "./ProfileMain";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const ProfilePage = () => {

  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : "";
  
  const { allUsers } = useSelector((state: any) => state.app);
  const { userInfo } = useSelector((state: any) => state.auth);

  const [selectedUser, setSelectedUser] = React.useState(userInfo);
  
  React.useEffect(() => {
    const index = allUsers.findIndex( (v: any) => v.username == id );
    if( index != -1 ){
      setSelectedUser(allUsers[index]);
    } else {
      setSelectedUser(userInfo);
    }
  }, [allUsers, id]);

  React.useEffect(() => {
    if(selectedUser._id == userInfo._id){
      setSelectedUser(userInfo);
    }
  }, [userInfo]);

  return <MainLayout menu="Profile">
    <ProfileHeader selectedUser={ selectedUser }/>
    <ProfileMain selectedUser={selectedUser}/>
  </MainLayout>;
};

export default ProfilePage;
