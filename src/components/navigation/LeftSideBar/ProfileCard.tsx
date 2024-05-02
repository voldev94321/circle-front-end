/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProfileCard = () => {
    const {userInfo} = useSelector((state: any) => state.auth);

    const router = useRouter();

    const onProfilePage = () => {
        router.push("/profile");
    }

    return (<div className="bg-gradient-to-b from-back2 to-back p-4 border-[1px] border-front rounded-lg flex w-full gap-4 cursor-pointer" onClick={onProfilePage}>
        <img className="rounded-full border-[1px] border-front w-[60px] h-[60px] object-cover" src={userInfo.avatarUrl ? userInfo.avatarUrl : "/img/avatar/default.png"} alt="pfp"/>
        <div className="flex flex-col justify-between">
            <div>{userInfo.circlename}</div>
            <div>{userInfo.username}</div>
            <div className="text-2xs">{userInfo.followers ? userInfo.followers.length : 0} Following { userInfo.followed ? userInfo.followed.length : 0 } Followers</div>
        </div>
    </div>);
};

export default ProfileCard;