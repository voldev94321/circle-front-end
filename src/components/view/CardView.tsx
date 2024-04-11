import { ReactNode } from "react";

interface CardViewProps {
  children: ReactNode;
}

const CardView = ({ children }: CardViewProps) => {
  return (
    <div className="bg-tertiary rounded-t-3xl p-4 min-h-full">
      <div className="h-full rounded-t-3xl p-8 pt-8 bg-gradient-to-b from-black to-transparent ">{children}</div>
    </div>
  );
};

export default CardView;
