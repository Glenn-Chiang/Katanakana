import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black shadow shadow-white z-10 fixed w-screen bottom-0 left-0 h-12 p-4 py-8 flex items-center justify-center">
      <Link to={'/'}>
        <FontAwesomeIcon icon={faHome}/>
      </Link>
    </nav>
  );
}

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
}
