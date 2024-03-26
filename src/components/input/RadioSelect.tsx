import { OptionDataItemType } from "@/types/OptionDataItem";
import React from "react";

interface RadioSelectProps {
  classNames?: string;
  data: OptionDataItemType[];
  name: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioSelect = ({ classNames, data, name, setValue }: RadioSelectProps) => {
  const [selectedOption, setSelectedOption] = React.useState(data[0].value);
  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className={`space-y-1 ${classNames}`}>
      {data.map((item, index) => (
        <label key={index} className="inline-flex w-full items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5"
            name={name}
            value={item.value}
            checked={selectedOption === item.value}
            onChange={handleOptionChange}
          />
          <span className="ml-2">{item.name}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioSelect;
