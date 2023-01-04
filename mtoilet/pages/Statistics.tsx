import Account from "../components/Account";
import Navbar from "../components/Navbar";
import SessionCheck from "../components/SessionCheck";

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
