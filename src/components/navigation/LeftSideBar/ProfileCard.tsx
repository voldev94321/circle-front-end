import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProfileCard = () => {
    const {userInfo} = useSelector((state: any) => state.auth);
    const router = useRouter();

    const onProfilePage = () => {
        router.push("/profile");
    }

    return (<div className="bg-gradient-to-b from-back2 to-back p-4 border-[1px] border-front rounded-lg flex w-full gap-4 cursor-pointer" onClick={onProfilePage}>
        <Image className="rounded-full border-[1px] border-front w-[60px] h-[60px]" src="/img/avatar/default.png" alt="pfp" width={60} height={60}/>
        <div className="flex flex-col justify-between">
            <div>{userInfo.username}</div>
            <div>{userInfo.username}</div>
            <div className="text-2xs">11 Following 200 Followers</div>
        </div>
    </div>);
};

export default ProfileCard;