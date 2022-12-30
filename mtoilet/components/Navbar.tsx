import Link from "next/link";
import React from "react";

const navbar_a =
  "flex grow py-2.5 px-7 w-fit text-center text-2xl items-center justify-center font-semibold transition duration-300 hover:bg-pg-grey";

function Navbar() {
  return (
    <div className="navbar">
      <Link href="/Map" className={navbar_a}>
        Map
      </Link>
      <Link href="/Devices" className={navbar_a}>
        Devices
      </Link>
      <Link href="/Events" className={navbar_a}>
        Events
      </Link>
      <Link href="/Statistics" className={navbar_a}>
        Statistics
      </Link>
      <Link href="/QRcode" className={navbar_a}>
        QR Code
      </Link>
    </div>
  );
}

export default Navbar;
