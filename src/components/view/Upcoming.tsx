"use client";

import MainLayout from "../navigation/MainLayout";

const Upcoming = ({menu}: any) => {
  return (
    <MainLayout menu={menu}>
      <div className="w-full h-full relative">
        <div className="-mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl">Hey! We’re still working on <br/>this. Check back soon.</div>
      </div>
    </MainLayout>
  );
};

export default Upcoming;
