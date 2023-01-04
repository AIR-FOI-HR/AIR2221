import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ReactSession } from "react-client-session";
import { useRouter } from "next/router";

export interface User {
  id: number;
  username: string;
  password: string;
  gender: string;
}

function Authentication() {
  const router = useRouter();

  const [dataUser, setDataUser] = useState([]);
  const [inputUserName, setInputUserName] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const [invalid, setinvalid] = useState(false);
  const refUsernameInput = useRef<HTMLInputElement | null>(null);
  const refPasswordInput = useRef<HTMLInputElement>(null);

  if (typeof window !== "undefined") {
    localStorage.getItem("key");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return axios
      .get("https://air2221.mobilisis.hr/api/users")
      .then((response) => setDataUser(response.data));
  };

  const checkCredentials = () => {
    console.log("Tu sam");
    refUsernameInput.current?.blur();
    refPasswordInput.current?.blur();
    var validation = false;
    dataUser.map((user: User) => {
      if (user.username == inputUserName && user.password == inputUserPass) {
        validation = true;
        ReactSession.set("username", user.username);
        router.push("/Map");
      }
    });
    if (!validation) setinvalid(true);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 ">
      <h1>Welcome to mToilet!</h1>
      <form
        onSubmit={(e) => {
          checkCredentials();
          e.preventDefault();
        }}
        className="welcome flex w-1/5 flex-col items-center justify-center rounded-xl bg-white"
      >
        <div className="my-3 flex w-2/6 flex-row items-center justify-center gap-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl ">Username:</h2>
            <h2 className="text-2xl ">Password:</h2>
          </div>
          <div className="flex flex-col gap-6">
            <input
              ref={refUsernameInput}
              placeholder="Enter your username"
              className="welcome rounded-lg border-2 outline-sky-600"
              onFocus={() => setinvalid(false)}
              onChange={(e) => setInputUserName(e.target.value)}
            ></input>
            <input
              ref={refPasswordInput}
              placeholder="Enter your password"
              className="welcome rounded-lg"
              onFocus={() => setinvalid(false)}
              onChange={(e) => setInputUserPass(e.target.value)}
            ></input>
          </div>
        </div>
        <button
          className="mb-3 w-fit rounded-lg bg-sky-600 px-4 text-xl text-white"
          onClick={checkCredentials}
        >
          Log in
        </button>
        {invalid && <h2 className="">Account doesn't exist</h2>}
      </form>
    </div>
  );
}

export default Authentication;
