import Account, { SessionCheck } from "../components/Account";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import TableEvents from "../components/TableEvents";

function Events() {
  return (
    <>
      {SessionCheck()}
      <Logo />
      <Navbar />
      <Account />
      <TableEvents />
    </>
  );
}

export default Events;
