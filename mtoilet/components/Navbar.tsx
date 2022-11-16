import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <a className={styles.navbar_a}>Map</a>
      <a className={styles.navbar_a}>Devices</a>
      <a className={styles.navbar_a}>Events</a>
      <a className={styles.navbar_a}>Statistics</a>
    </div>
  );
}

export default Navbar;
