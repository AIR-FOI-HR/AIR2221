import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/Map" className={styles.navbar_a}>
        Map
      </Link>
      <Link href="/Devices" className={styles.navbar_a}>
        Devices
      </Link>
      <Link href="/Events" className={styles.navbar_a}>
        Events
      </Link>
      <Link href="/Statistics" className={styles.navbar_a}>
        Statistics
      </Link>
    </div>
  );
}

export default Navbar;
