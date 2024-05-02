/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import TransparentInput from "@/components/input/TransparentInput";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";

const Followers = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const { allUsers } = useSelector((state: any) => state.app);
  const [search, setSearch] = React.useState("");
  const [isFollowers, setIsFollowers] = React.useState(false);
  const [userList, setUserList] = React.useState([]);

  const handleKeyPress = (e: any) => {};

  const onFollowersChange = () => {
    setIsFollowers(!isFollowers);
  };

  const handleClickUser = (user: any) => {};

  React.useEffect(() => {
    const followers = !isFollowers
      ? userInfo.followers
        ? userInfo.followers
        : []
      : userInfo.followed
      ? userInfo.followed
      : [];
    
    const searchString = search.charAt(0) == "@" ? search.slice(1) : search;
    setUserList(
      allUsers &&
        allUsers
          .filter(
            (v: any) => followers.findIndex((uv: any) => uv == v._id) != -1
          )
          .filter(
            (v: any) =>
              search.charAt(0) == "@" && v.username.includes(searchString) || search.charAt(0) != "@" && v.circlename.includes(searchString)
          )
    );
  }, [isFollowers, allUsers, userInfo, search]);

  return (
    <div>
      <div className="border-t-2 border-primary w-full"></div>
      <div className="flex gap-2 mt-4 items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onFollowersChange}
        >
          {isFollowers ? "Followers\t" : "Following\t"}
          {isFollowers ? (
            <MdKeyboardArrowUp className="text-black bg-front" />
          ) : (
            <MdKeyboardArrowDown className="text-black bg-front" />
          )}
        </div>
        <div className="flex-grow flex p-1 rounded-2xl bg-front bg-opacity-10 items-center px-4">
          <div className="flex-grow ">
            <TransparentInput
              placeholder="Search here..."
              value={search}
              setValue={setSearch}
              type="text"
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {userList.map((user: any, index: number) => (
          <Link key={index} href={"/profile?id=" + user.username}>
            {" "}
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-secondary p-2"
              onClick={() => handleClickUser(user)}
            >
              <img
                src={
                  user.avatarUrl ? user.avatarUrl : "/img/avatar/default.png"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full border-front border-2 object-cover"
              />
              <div>{user.circlename}</div>
              <div className="opacity-50">@{user.username}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Followers;
