"use client";
import MainLayout from "@/components/navigation/MainLayout";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileMain from "./ProfileMain";

const ProfilePage = () => {

  return <MainLayout menu="Profile">
    <ProfileHeader/>
    <ProfileMain/>
  </MainLayout>;
};

export default ProfilePage;
