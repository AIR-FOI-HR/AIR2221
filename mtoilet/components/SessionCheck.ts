import { useState } from "react";
import { useRouter } from "next/router";
import { ReactSession } from "react-client-session";

const SessionCheck = () => {
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);

  if (calledPush) return;
  if (typeof window !== "undefined") {
    if (ReactSession.get("username") == undefined)
      router.push("/Authentication");
    setCalledPush(true);
  }
};

export default SessionCheck;
