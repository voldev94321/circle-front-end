import { IoIosNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import TransparentInput from "@/components/input/TransparentInput";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValueState } from "@/store/appSlice";
import { useRouter } from "next/navigation";

interface TopBarProps {
  setMenu: any;
  menu: string;
}

const TopBar = ({ setMenu, menu }: TopBarProps) => {
  const { searchValue } = useSelector((state: any) => state.app);
  const [search, setSearch] = React.useState(searchValue);
  const [menuLabel, setMenuLabel] = React.useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearch = () => {
    dispatch(setSearchValueState(search));
  }

  const handleKeyPress = (e: any) => {
    if( e.key == "Enter" ) {
      handleSearch();
    }
  }

  const handleMessage = () => {
    router.push("/messages");
  }
  
  React.useEffect(() => {
    let menuPrefix = "Menu";
    switch(menu){
      case "Wallet":
      case "Messages":
      case "Saved":
        menuPrefix = "Library";
        break;
    }

    setMenuLabel(menuPrefix + " > " + menu);
  }, [menu]);

  return (
    <div className="flex gap-6 items-center">
      <div
        onClick={() => {
          setMenu(true);
        }}
      >
        {menuLabel}
      </div>
      <div className="flex-grow flex p-2 rounded-2xl bg-front bg-opacity-10 items-center px-4">
        <div className="flex-grow ">
          <TransparentInput
            placeholder="Search here..."
            value={search}
            setValue={setSearch}
            type="text"
            onKeyDown={handleKeyPress}
          />
        </div>
        <FaSearch size={18} className="cursor-pointer" onClick={handleSearch}/>
      </div>
      <div className="p-2 bg-front bg-opacity-10 rounded-2xl px-4 hover:scale-95  duration-500 cursor-pointer" onClick={handleMessage}>
        <MdMessage size={20} />
      </div>
      <div className="p-2 bg-front bg-opacity-10 rounded-2xl px-4 hover:scale-95 duration-500 cursor-pointer">
        <IoIosNotifications size={20} />
      </div>
    </div>
  );
};

export default TopBar;
