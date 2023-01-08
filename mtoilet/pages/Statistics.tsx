import Account, { SessionCheck } from "../components/Account";
import { Charts } from "../components/Charts";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

function Statistics() {
  return (
    <>
      {SessionCheck()}
      <Logo />
      <Navbar />
      <Account />
      <Charts />
    </>
  );
}

export default Statistics;
