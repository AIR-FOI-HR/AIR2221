import Head from "next/head";
import Image from "next/image";
import MapLoader from "../components/MapLoader";
import Navbar from "../components/Navbar";
import styles from "../styles/Navbar.module.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <MapLoader />
    </div>
  );
}
