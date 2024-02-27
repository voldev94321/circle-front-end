import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  classNames?: string;
  onClick?: () => void;
}

const PrimaryButton = ({
  children,
  classNames = "",
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${classNames} rounded-3xl bg-primary px-2 py-2 duration-500 hover:scale-95 min-w-[250px]`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
