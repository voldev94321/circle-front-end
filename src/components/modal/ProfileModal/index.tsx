/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { updateProfile } from "@/apis/auth";
import { uploadImage } from "@/apis/uploadImage";
import PrimaryButton from "@/components/button/PrimaryButton";
import TransparentInput from "@/components/input/TransparentInput";
import TransparentTextArea from "@/components/input/TransparentTextArea";
import { setUserInfo } from "@/store/authSlice";
import { setProfileModalState } from "@/store/modalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileModal = () => {
  const { profileModalState } = useSelector((state: any) => state.modal);
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState(userInfo.circlename);
  const [bio, setBio] = React.useState(userInfo.bio);
  const [previewImage, setPreviewImage] = React.useState("");
  const [label1, setLabel1] = React.useState(
    userInfo.extra && userInfo.extra[0] ? userInfo.extra[0].label : ""
  );
  const [label2, setLabel2] = React.useState(
    userInfo.extra && userInfo.extra[1] ? userInfo.extra[1].label : ""
  );
  const [label3, setLabel3] = React.useState(
    userInfo.extra && userInfo.extra[2] ? userInfo.extra[2].label : ""
  );
  const [content1, setContent1] = React.useState(
    userInfo.extra && userInfo.extra[0] ? userInfo.extra[0].content : ""
  );
  const [content2, setContent2] = React.useState(
    userInfo.extra && userInfo.extra[1] ? userInfo.extra[1].content : ""
  );
  const [content3, setContent3] = React.useState(
    userInfo.extra && userInfo.extra[2] ? userInfo.extra[2].content : ""
  );

  const onClose = () => {
    dispatch(setProfileModalState(false));
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage("" + reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = async () => {
    const userData = { ...userInfo };
    if (previewImage) {
      const uploadedResult = await uploadImage(previewImage);
      userData.avatarUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL + "/uploads/" + uploadedResult.data;
    }

    userData.circlename = username;
    userData.bio = bio;
    userData.extra = [];

    if (label1 && content1) {
      userData.extra.push({
        label: label1,
        content: content1,
      });
    }
    if (label2 && content2) {
      userData.extra.push({
        label: label2,
        content: content2,
      });
    }
    if (label3 && content3) {
      userData.extra.push({
        label: label3,
        content: content3,
      });
    }

    const result = await updateProfile(userInfo.token, userData);
    if (result.success) {
      toast.success("Profile updated successfully!");
      dispatch(
        setUserInfo({
          ...userInfo,
          ...result.user,
        })
      );
      dispatch(setProfileModalState(false));
    } else {
      toast.error("Profile was not updated!");
    }
  };

  React.useEffect(() => {
    if (profileModalState) {
      setBio(userInfo.bio);
      setLabel1(
        userInfo.extra && userInfo.extra[0] ? userInfo.extra[0].label : ""
      );
      setLabel2(
        userInfo.extra && userInfo.extra[1] ? userInfo.extra[1].label : ""
      );
      setLabel3(
        userInfo.extra && userInfo.extra[2] ? userInfo.extra[2].label : ""
      );
      setContent1(
        userInfo.extra && userInfo.extra[0] ? userInfo.extra[0].content : ""
      );
      setContent2(
        userInfo.extra && userInfo.extra[1] ? userInfo.extra[1].content : ""
      );
      setContent3(
        userInfo.extra && userInfo.extra[2] ? userInfo.extra[2].content : ""
      );
    }
  }, [profileModalState]);

  return profileModalState ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-70"
      onMouseDown={() => {
        onClose();
      }}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-3xl md:bg-back bg-back w-[40rem] h-full md:h-fit !bg-opacity-70 p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full text-3xl font-bold">
          <b className="text-primary">Customize</b> Your Profile
        </div>
        <div>
          Tailor your public profile and accompany your posts with personalized
          details. A completed profile and a profile picture increase the
          likelihood of others following and engaging with you.
        </div>
        <div className="w-full mt-4">
          PROFILE INFORMATION: Update profile picture, username, and bio
        </div>
        <div className="flex gap-4 w-full">
          <div className="w-32 h-32 border-front border-2 rounded-3xl overflow-hidden relative cursor-pointer">
            {(previewImage || userInfo.avatarUrl) && (
              <img
                src={previewImage ? previewImage : userInfo.avatarUrl}
                alt="avatar"
                className="w-full h-full object-contain"
              />
            )}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
              +
            </div>
            <input
              className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex-grow flex flex-col gap-4">
            <div className="w-full border-2 border-primary rounded-xl p-2">
              <TransparentInput
                placeholder="Username"
                type="text"
                value={username}
                setValue={setUsername}
              />
            </div>
            <div className="w-full border-2 border-primary rounded-xl p-2 flex-grow">
              <TransparentTextArea
                classNames="h-full resize-none"
                placeholder="Bio"
                value={bio}
                setValue={setBio}
                limit={100}
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          EXTRA FIELDS: Your website, demographics, or anything you want.
        </div>
        <div className="flex gap-4 justify-between w-full">
          <div className="w-full border-2 border-primary rounded-xl p-2">
            <TransparentInput
              placeholder="Label"
              type="text"
              value={label1}
              setValue={setLabel1}
              limit={30}
            />
          </div>
          <div className="w-full border-2 border-primary rounded-xl p-2">
            <TransparentInput
              placeholder="Content"
              type="text"
              value={content1}
              setValue={setContent1}
              limit={30}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-between w-full">
          <div className="w-full border-2 border-primary rounded-xl p-2">
            <TransparentInput
              placeholder="Label"
              type="text"
              value={label2}
              setValue={setLabel2}
              limit={30}
            />
          </div>
          <div className="w-full border-2 border-primary rounded-xl p-2">
            <TransparentInput
              placeholder="Content"
              type="text"
              value={content2}
              setValue={setContent2}
              limit={30}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-between w-full">
          <div className="w-full border-2 border-primary rounded-xl p-2">
            <TransparentInput
              placeholder="Label"
              type="text"
              value={label3}
              setValue={setLabel3}
              limit={30}
            />
          </div>
          <div className="w-full border-2 border-primary rounded-xl p-2">
            <TransparentInput
              placeholder="Content"
              type="text"
              value={content3}
              setValue={setContent3}
              limit={30}
            />
          </div>
        </div>
        <PrimaryButton classNames="w-full mt-4" onClick={handleComplete}>
          Complete
        </PrimaryButton>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default ProfileModal;
