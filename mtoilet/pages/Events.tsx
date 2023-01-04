import Account from "../components/Account";
import Navbar from "../components/Navbar";
import SessionCheck from "../components/SessionCheck";
import TableDevices from "../components/Table";

function Statistics() {
  return (
    <>
      {SessionCheck()}
      <Navbar />
      <Account />
    </>
  );
}

export default Statistics;
