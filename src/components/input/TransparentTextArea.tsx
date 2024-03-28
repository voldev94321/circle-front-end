import React from "react";

interface TransparentTextAreaProps {
  classNames?: string;
  placeholder: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const TransparentTextArea = ({
  classNames,
  placeholder,
  value,
  setValue,
}: TransparentTextAreaProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [lines, setLines] = React.useState(1);

  const handleChange = (e: any) => {
    const lines = textareaRef?.current?.value.split("\n").length;
    if (lines) {
      setLines(lines);
      console.log(lines);
    }
    setValue(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      className={`w-full text-front bg-transparent focus:outline-none ${classNames}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={lines}
    />
  );
};

export default TransparentTextArea;
