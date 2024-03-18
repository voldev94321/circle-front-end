import { ReactNode } from "react";

interface CardViewProps {
  children: ReactNode;
}

const CardView = ({ children }: CardViewProps) => {
  return (
    <div className="mt-12 bg-tertiary rounded-3xl p-4">
      <div className="rounded-3xl p-8 bg-gradient-to-b from-black to-transparent ">{children}</div>
    </div>
  );
};

export default CardView;
