import Link from "next/link";

const MenuItems = [
  {
    value: "About",
    link: "about",
  },
  {
    value: "Team",
    link: "team",
  },
  {
    value: "Socials",
    link: "socials",
  },
];

const LandingHeader = () => {
  return (
    <div className="fixed top-0 flex justify-between w-full bg-back">
        <Link className="p-6 ml-20 hidden md:block text-xl" href={"/"}>
            Home
        </Link>
      <div className="p-4 mr-20 hidden md:block">
        <div className="flex gap-8 text-lg items-center">
          {MenuItems.map((item, index) => (
            <Link key={index} className="" href={item.link}>
              {item.value}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
