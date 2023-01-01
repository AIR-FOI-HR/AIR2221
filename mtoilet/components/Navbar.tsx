import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router";

const activeItemClass = "bg-pg-grey";

const navbar_a =
  "flex grow py-2.5 px-7 w-fit text-center text-2xl items-center justify-center font-semibold transition duration-300 hover:bg-pg-grey ";

function Navbar() {
  const router = useRouter();

  return (
    <div className="navbar">
      <div
        className={
          router.pathname == "/Map" ? navbar_a + activeItemClass : navbar_a
        }
      >
        <Link href="/Map">Map</Link>
      </div>
      <div
        className={
          router.pathname == "/Devices" ? navbar_a + activeItemClass : navbar_a
        }
      >
        <Link href="/Devices">Devices</Link>
      </div>
      <div
        className={
          router.pathname == "/Events" ? navbar_a + activeItemClass : navbar_a
        }
      >
        <Link href="/Events">Events</Link>
      </div>
      <div
        className={
          router.pathname == "/Statistics"
            ? navbar_a + activeItemClass
            : navbar_a
        }
      >
        <Link href="/Statistics">Statistics</Link>
      </div>
      <div
        className={
          router.pathname == "/QRcode" ? navbar_a + activeItemClass : navbar_a
        }
      >
        <Link href="/QRcode">QR Code</Link>
      </div>
    </div>
  );
}

export default Navbar;
