import Account, { SessionCheck } from "../components/Account";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

function QRcode() {
  return (
    <>
      {SessionCheck()}
      <Logo />
      <Navbar />
      <Account />
    </>
  );
}

export default QRcode;
