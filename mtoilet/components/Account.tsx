import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function SessionCheck() {
  const router = useRouter();
  const [sessionUsername, setSessionUsername] = useState<string | null>("");

  const sessionCheck = () => {
    setSessionUsername(localStorage.getItem("sessionUsername"));

    if (localStorage.getItem("sessionUsername")?.length == 0)
      router.push("/Authentication");
  };

  useEffect(() => {
    sessionCheck();
  }, []);
}

function Account() {
  const router = useRouter();
  const [btnAccClicked, setBtnAccClicked] = useState(false);
  const [sessionUsername, setSessionUsername] = useState<string | null>();

  const logOut = () => {
    localStorage.setItem("sessionUsername", "");
    router.push("/Authentication");
  };

  useEffect(
    () => setSessionUsername(localStorage.getItem("sessionUsername")),
    []
  );

  return (
    <>
      <div className="account flex flex-col items-center justify-center">
        <button
          onClick={() => setBtnAccClicked(!btnAccClicked)}
          className="mx-3 text-2xl"
        >
          Hi, {sessionUsername}
        </button>
      </div>
      {btnAccClicked && (
        <div className="account_dropdown flex flex-col items-center justify-center">
          <ul>
            <li>
              <button className="mx-3 text-2xl" onClick={logOut}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Account;
