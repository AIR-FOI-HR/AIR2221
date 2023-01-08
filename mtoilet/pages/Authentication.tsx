import { fetchData } from "../components/GetMethod";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import WelcomeLabel from "../components/WelcomeLabel";

export interface User {
  id?: number;
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
  const refPasswordInput = useRef<HTMLInputElement | null>(null);

  const checkCredentials = () => {
    refUsernameInput.current?.blur();
    refPasswordInput.current?.blur();
    var validation = false;
    dataUser.map((user: User) => {
      if (user.username == inputUserName && user.password == inputUserPass) {
        validation = true;
        localStorage.setItem("sessionUsername", user.username);
        router.push("/Map");
      }
    });
    if (!validation) setinvalid(true);
  };

  const openRegister = () => {
    router.push("/Register");
  };

  useEffect(() => {
    async function getData() {
      const dataUserTemp = await fetchData("users");
      setDataUser(dataUserTemp);
    }

    getData();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <WelcomeLabel />
      <form
        onSubmit={(e) => {
          checkCredentials();
          e.preventDefault();
        }}
        className="welcome flex w-2/6 flex-col items-center justify-center rounded-xl bg-white"
      >
        <table className="my-6 text-center">
          <tbody>
            <tr>
              <td>
                <h2 className="mb-2 text-xl">Username:</h2>
              </td>
              <td className="px-0">
                <input
                  ref={refUsernameInput}
                  placeholder="Enter your username"
                  className="welcome mb-2 w-full rounded-lg border-2 indent-1"
                  onFocus={() => setinvalid(false)}
                  onChange={(e) => setInputUserName(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="text-xl">Password:</h2>
              </td>
              <td className="px-0">
                <input
                  type="password"
                  ref={refPasswordInput}
                  placeholder="Enter your password"
                  className="welcome w-full rounded-lg indent-1"
                  onFocus={() => setinvalid(false)}
                  onChange={(e) => setInputUserPass(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          type="submit"
          value="Log in"
          className="mt-2 mb-3 w-fit rounded-xl bg-sky-600 p-1 px-4 text-xl text-white hover:cursor-pointer hover:bg-sky-500"
        ></input>
        {invalid && (
          <h2 className="text-xl text-red-600">Account doesn't exist</h2>
        )}
        <button
          className="text-xl underline hover:text-sky-600"
          onClick={openRegister}
        >
          I don't have an account
        </button>
      </form>
    </div>
  );
}

export default Authentication;
