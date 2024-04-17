import Dropdown from "../Dropdown";
import donor from "../../assets/donor.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between h-[10vh] items-center px-4 shadow-sm shadow-neutral-500">
      <div className="h-full flex flex-row items-center pl-5 pt-1">
        <img src={donor} alt="Donor logo" width={45} height={45} className="" />
      </div>
      <div className="w-3/4 h-full flex justify-center gap-10 items-center">
        <NavLink to={"/"} className="text-[90%]">
          Home
        </NavLink>
        <Dropdown />
        <NavLink to={"/donations"} className="text-[90%]">
          Donations
        </NavLink>
        <NavLink to={"/campaigns"} className="text-[90%]">
          Campaigns
        </NavLink>
        <NavLink to={"/report"} className="text-[90%]">
          Report
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
