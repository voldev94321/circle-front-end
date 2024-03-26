import PrimaryButton from "@/components/button/PrimaryButton";
import RadioSelect from "@/components/input/RadioSelect";
import { setReportModalState, setRepostModalState } from "@/store/modalSlice";
import dynamic from "next/dynamic";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ReportModal = () => {
  const { reportModalState } = useSelector((state: any) => state.modal);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [ selectedOption, setSelectedOption ] = React.useState("");
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setReportModalState(false));
  };

  const handleReport = () => {
    console.log("RERER");
  };

  return reportModalState ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-transparent"
      onMouseDown={() => {
        onClose();
      }}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-3xl md:bg-back bg-back w-[40rem] h-full md:h-fit border-primary border-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <RadioSelect
          classNames="ml-4 mt-1"
          data={[{ name: "All", value: "all" }]}
          name="category"
          setValue={setSelectedOption}
        />
        <div className="w-full p-2 flex">
          <PrimaryButton classNames="ml-auto" onClick={handleReport}>
            Report
          </PrimaryButton>
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default ReportModal;
