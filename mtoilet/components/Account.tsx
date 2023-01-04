import React, { useState } from "react";
import { ReactSession } from "react-client-session";
import { useRouter } from "next/router";

function Account() {
  const router = useRouter();
  const [btnAccClicked, setBtnAccClicked] = useState(false);

  const logOut = () => {
    router.push("/Authentication");
  };
  return (
    <>
      <div className="account flex flex-col items-center justify-center">
        <button
          onClick={() => setBtnAccClicked(!btnAccClicked)}
          className="mx-3 text-2xl"
        >
          Hi, {ReactSession.get("username")}
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
