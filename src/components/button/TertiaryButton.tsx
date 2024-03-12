import React, { ReactNode } from "react";

interface TertiaryButtonProps {
  children: ReactNode;
  classNames?: string;
  onClick?: () => void;
  disabled?: boolean
}

const TertiaryButton = ({
  children,
  classNames = "",
  onClick,
  disabled
}: TertiaryButtonProps) => {
  const [effect, setEffect] = React.useState(false);
  return (
    <button
      onClick={() => {
        if(onClick){
          onClick();
        }
        setEffect(true);
      }}
      className={`${classNames} rounded-3xl bg-tertiary px-2 py-2 duration-500 min-w-[250px] ${disabled ? "opacity-50" : "hover:scale-95 hover:shadow-xl "} ${ effect && "animate-wiggle"}`}
      disabled={disabled}
      onAnimationEnd={() => setEffect(false)}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
