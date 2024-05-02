/* eslint-disable react-hooks/exhaustive-deps */
import PrimaryButton from "@/components/button/PrimaryButton";
import RadioSelect from "@/components/input/RadioSelect";
import { setReportModalState, setRepostModalState } from "@/store/modalSlice";
import dynamic from "next/dynamic";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const reportList = [
  { name: "Spam", value: "Spam" },
  { name: "Fraud", value: "Fraud" },
  { name: "Child sexual exploitation or abuse", value: "Child Sexual" },
];

const ReportModal = () => {
  const { reportModalState } = useSelector((state: any) => state.modal);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [selectedOption, setSelectedOption] = React.useState("");
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setReportModalState(false));
  };

  const handleReport = () => {
    onClose();
    toast.success("You reported this post!");
  };
  
  React.useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (reportModalState) {
      // Add event listener when the modal is open
      document.addEventListener('keydown', handleKeyDown);
    } else {
      // Remove event listener when the modal is closed
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      // Cleanup function: remove event listener when component unmounts
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [reportModalState, onClose]);

  return reportModalState ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90"
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
        <div className="text-3xl">Report This Post?</div>
        <hr className="opacity-10 w-full -my-2" />
        <RadioSelect
          classNames="ml-4 mt-2"
          data={reportList}
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
