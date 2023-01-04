import Account from "../components/Account";
import Navbar from "../components/Navbar";
import SessionCheck from "../components/SessionCheck";

function QRcode() {
  return (
    <>
      {SessionCheck()}
      <Navbar />
      <Account />
    </>
  );
}

export default QRcode;
