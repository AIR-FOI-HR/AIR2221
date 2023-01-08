import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { User } from "./Authentication";
import WelcomeLabel from "../components/WelcomeLabel";
import { fetchData } from "../components/GetMethod";
import { postData } from "../components/PostMethod";

function Register() {
  const router = useRouter();

  const [dataUsers, setDataUsers] = useState([]);
  const [inputUserName, setInputUserName] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const [inputUserPassRepeat, setInputUserPassRepeat] = useState("");
  const [invalid, setinvalid] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);

  const refUsernameInput = useRef<HTMLInputElement | null>(null);
  const refPasswordInput = useRef<HTMLInputElement | null>(null);
  const refPasswordInputReenter = useRef<HTMLInputElement | null>(null);

  async function postMethod(inputData: User) {
    const success = await postData("users", inputData);
    if (success) {
      localStorage.setItem("sessionUsername", inputData.username);
      router.push("/");
    }
  }

  const registerUser = () => {
    if (!usernameExists) {
      refUsernameInput.current?.blur();
      refPasswordInput.current?.blur();
      refPasswordInputReenter.current?.blur();

      if (!checkInputs()) {
        setinvalid(true);
        return;
      }

      const inputData: User = {
        username: inputUserName,
        password: inputUserPass,
        gender: inputGender,
      };

      postMethod(inputData);
    }
  };

  const checkInputs = () => {
    if (inputUserPass == inputUserPassRepeat) return true;
    else return false;
  };

  const openLoginForm = () => {
    router.push("/Authentication");
  };

  useEffect(() => {
    var exists = false;
    dataUsers.map((user: User) => {
      if (user.username == inputUserName) {
        exists = true;
      }
    });
    if (exists) setUsernameExists(true);
    else setUsernameExists(false);
  }, [inputUserName]);

  useEffect(() => {
    async function getDataUsers() {
      const dataUsersTemp = await fetchData("users");
      setDataUsers(dataUsersTemp);
    }

    getDataUsers();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 ">
      <WelcomeLabel />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser();
        }}
        className="welcome flex w-2/6 flex-col items-center justify-center rounded-xl bg-white"
      >
        <table className="my-6 text-center">
          <tbody>
            <tr>
              <td>
                <h2 className="mb-2 text-right text-xl">Username:</h2>
              </td>
              <td>
                <input
                  ref={refUsernameInput}
                  placeholder="Enter your username"
                  className="welcome mb-2 rounded-lg border-2 indent-1"
                  onFocus={() => setinvalid(false)}
                  onChange={(e) => setInputUserName(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="mb-2 text-right text-xl">Gender:</h2>
              </td>
              <td>
                <select
                  onChange={(e) => setInputGender(e.target.value)}
                  className="welcome mb-2 w-full rounded-lg border-2"
                  required
                >
                  <option>Select your gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="mb-2 text-right text-xl">Password:</h2>
              </td>
              <td>
                <input
                  type="password"
                  ref={refPasswordInput}
                  placeholder="Enter your password"
                  className="welcome mb-2 rounded-lg border-2 indent-1"
                  onFocus={() => setinvalid(false)}
                  onChange={(e) => setInputUserPass(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="text-right text-xl">Reenter password:</h2>
              </td>
              <td>
                <input
                  type="password"
                  ref={refPasswordInputReenter}
                  placeholder="Enter your password"
                  className="welcome rounded-lg border-2 indent-1"
                  onFocus={() => setinvalid(false)}
                  onChange={(e) => setInputUserPassRepeat(e.target.value)}
                  required
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          type="submit"
          value="Register"
          className="mt-2 mb-3 w-fit rounded-xl bg-sky-600 p-1 px-4 text-xl text-white hover:cursor-pointer hover:bg-sky-500"
          disabled={usernameExists ? true : false}
        ></input>
        {invalid && (
          <h2 className="text-xl text-red-600">Wrong input, try again.</h2>
        )}
        {usernameExists && (
          <h2 className="text-xl text-red-600">Username exists!</h2>
        )}
        <button
          className="text-xl underline hover:text-sky-600"
          onClick={openLoginForm}
        >
          I already have an account
        </button>
      </form>
    </div>
  );
}

export default Register;
