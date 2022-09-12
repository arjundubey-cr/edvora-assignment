import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineArrowBackIosNew,
  MdOutlineBarChart,
  MdOutlineShoppingBag,
  IoMdPerson,
  MdPerson,
} from "react-icons/md";
const Menus = [
  {
    title: "Overview",
    icon: <MdOutlineBarChart />,
    route: "/",
  },
  {
    title: "Products",
    icon: <MdOutlineShoppingBag />,
    route: "/products",
  },
  {
    title: "Orders",
    icon: <MdOutlineShoppingBag />,
    route: "/orders",
  },
];
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  });
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-stone-100 h-screen p-5  pt-8 relative duration-300`}>
      <button
        className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 border-dark-purple bg-white
         border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}>
        <MdOutlineArrowBackIosNew color="black" size={20} />
      </button>

      <div className="flex gap-x-4 items-center">
        <MdDashboard
          color="black"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-black origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}>
          SalesBoard
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link to={Menu.route}>
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-purple-200 text-slate-600 text-sm font-semibold items-center gap-x-4 
             ${
               location.pathname === Menu.route
                 ? "bg-purple-700 text-white"
                 : "not"
             }`}>
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
