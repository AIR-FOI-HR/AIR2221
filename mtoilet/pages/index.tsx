import MapLoader from "../components/MapLoader";
import { SessionCheck } from "../components/Account";

export default function Home() {
  return (
    <>
      {SessionCheck()}
      <MapLoader />
    </>
  );
}
