"use client";
import LandingFooter from "@/components/navigation/footer";
import Image from "next/image";
import { lazy } from "react";

const LazyLandingHeader = lazy(
  () => import("../../components/navigation/header")
);

const AboutPage = () => {
  return (
    <div>
      <LazyLandingHeader />
      <LandingFooter />
      <Image
        className="fixed top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-52 opacity-10"
        src="/img/logo.svg"
        alt="logo"
        height={500}
        width={500}
      />
      <div className="ml-8 mr-8 md:ml-40 md:mr-40 mt-32 mb-20 flex-col flex gap-10">
        <div className="text-4xl font-bold mt-10">
          The future of SocialFi starts here, with 
          <span className="text-primary"> Circle</span>.
        </div>
        <div className="text-2xl text-tertiary">
          Our mission is to unite the world through decentralized connections
        </div>
        <div className="text-lg text-justify">
          We&apos;re thrilled to introduce you to our platform. This marks an
          exciting milestone as we unveil Circle, a next-generation SocialFi
          platform designed to transform how you engage with social media and
          finance. Our journey began as a simple insight: existing platforms
          lacked the seamless integration of social interaction with financial
          opportunities. We saw a gap and decided to fill it with Circle–a
          platform that caters to tech needs of both crypto enthusiasts and
          everyday users alike. Imagine a world where your social interactions
          seamlessly intersect with financial possibilities. With Circle, you
          can access robust feature reminiscent of platforms you&apos;re familiar
          with while effortlessly engaging in financial transactions. Whether
          you&apos;re a content creator looking to earn fair compensation or a user
          seeking a vibrant community to connect with, Circle has something for
          everyone.<br/><br/> 
          But our vision goes beyond features and functionalities. At
          Circle, we&apos;re committed to prioritizing your security and privacy.
          Built on Cardano&apos;s blockchain, our platform ensures that your data and
          transactions are safeguarded at every turn.<br/><br/> Join us as we embark on
          this journey to redefine this intersection of social engagement and
          financial empowerment. We&apos;re just getting started, and we can&apos;t wait
          to share our exciting updates, new features, and platform with you.<br/><br/>
          Together, let&apos;s build something extraordinary. <br/><br/>Jordan Moore, Founder &
          CEO
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
