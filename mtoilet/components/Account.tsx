import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

export function SessionCheck() {
  const router = useRouter();
  const [sessionUsername, setSessionUsername] = useState<string | null>("");

  const sessionCheck = () => {
    if (localStorage.getItem("sessionUsername")?.length == 0)
      router.push("/Authentication");
  };

  useEffect(() => {
    sessionCheck();
  }, []);
}

function Account() {
  const router = useRouter();
  const [btnAccClicked, setBtnAccClicked] = useState<boolean | undefined>();
  const [sessionUsername, setSessionUsername] = useState<string | null>();

  const logOutDivStyle = (active: boolean | undefined) => {
    return classNames(
      "account_dropdown",
      "flex",
      {
        slideDown: active,
        slideUp: !active,
      },
      "flex-col",
      "items-center",
      "justify-center",
      "hover:bg-pg-grey"
    );
  };

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
      <div className={logOutDivStyle(btnAccClicked)}>
        <ul>
          <li>
            <button className="mx-3 text-2xl" onClick={logOut}>
              Log out
            </button>
          </li>
        </ul>
      </div>

      <div className="account flex flex-col items-center justify-center">
        <button
          onClick={() => setBtnAccClicked(!btnAccClicked)}
          className="mx-3 text-2xl"
        >
          Hi, {sessionUsername}
        </button>
      </div>
    </>
  );
}

export default Account;
