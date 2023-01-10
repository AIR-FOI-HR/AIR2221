import Navbar from "../components/Navbar";
import Account, { SessionCheck } from "../components/Account";
import Logo from "../components/Logo";
import MapComponent from "../components/MapComponent";

export default function Map() {
  return (
    <>
      {SessionCheck()}
      <Logo />
      <Navbar />
      <Account />
      <MapComponent />
    </>
  );
}
