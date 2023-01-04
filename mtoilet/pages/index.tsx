import MapLoader from "../components/MapLoader";
import { ReactSession } from "react-client-session";
import Authentication from "./Authentication";
import { useEffect, useState } from "react";
import SessionCheck from "../components/SessionCheck";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    localStorage.getItem("key");
    ReactSession.setStoreType("localStorage");
    setUsername(ReactSession.get("username"));
  }, []);

  return (
    <>
      {SessionCheck()}
      {username.length > 0 ? <MapLoader /> : <Authentication />}
    </>
  );
}
