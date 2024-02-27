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
        <div className="fixed p-4 right-20 hidden md:block">
            <div className="flex gap-8">
                {MenuItems.map((item, index) => (
                    <Link key={index} className="" href={item.link}>
                        {item.value}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LandingHeader;