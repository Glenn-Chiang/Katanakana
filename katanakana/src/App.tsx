import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faScroll } from "@fortawesome/free-solid-svg-icons/faScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import KatanaIcon from "./components/KatanaIcon";

export default function App() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <header className=" text-5xl sm:text-8xl font-bold w-full flex flex-col items-center relative justify-center">
        <div className="h-4/5 w-4/5 sm:h-1/2 sm:w-1/3 flex justify-center items-center opacity-60">
          <KatanaIcon />
        </div>
        <h1 className="z-10 uppercase absolute text-white text-center flex flex-col items-center justify-center">
          <em>かたなかな</em>
          <em>Katanakana</em>
          <em>カタナカナ</em>
        </h1>
      </header>
      <MenuButtons />
    </main>
  );
}

function MenuButtons() {
  const menuItems: MenuItem[] = [
    { label: "dojo", to: "/dojo", icon: faPlay },
    {
      label: "scrolls",
      to: "/scrolls",
      icon: faScroll,
    },
  ];

  return (
    <nav className="flex flex-col gap-4 w-full items-center justify-center p-4">
      {menuItems.map((menuItem, index) => (
        <MenuButton menuItem={menuItem} key={index} />
      ))}
    </nav>
  );
}

type MenuItem = {
  label: string;
  to: string;
  icon: IconDefinition;
};

function MenuButton({ menuItem }: { menuItem: MenuItem }) {
  const { to, label, icon } = menuItem;
  return (
    <NavLink
      to={to}
      className={
        "capitalize border-slate-400 text-slate-300 w-3/4 hover:w-4/5 hover:text-white hover:border-white border-2 flex items-center gap-2 p-2 rounded-md transition justify-center"
      }
    >
      <FontAwesomeIcon icon={icon} />
      {label}
    </NavLink>
  );
}
