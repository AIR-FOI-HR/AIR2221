import Account, { SessionCheck } from "../components/Account";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import TableDevices from "../components/TableDevices";

function Statistics() {
  return (
    <>
      {SessionCheck()}
      <Logo />
      <Navbar />
      <Account />
      <TableDevices />
    </>
  );
}

export default Statistics;
