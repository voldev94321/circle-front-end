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
    return (
      <textarea
        className={`w-full text-front h-fit bg-transparent focus:outline-none ${classNames}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  };
  
  export default TransparentTextArea;
  