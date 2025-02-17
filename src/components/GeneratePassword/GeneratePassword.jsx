import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCoppiedPasswordSlice } from "../../store/password/coppiedPasswordSlice";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { Alert, Disclaimer } from "../index";

function GeneratePassword() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [length, setLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(true);
  const [allowSChars, setAllowSChars] = useState(false);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState();

  useEffect(() => {
    setPassword(generatePassword(length, allowNumbers, allowSChars));
  }, [length, allowNumbers, allowSChars]);

  const inputPass = useRef(null);

  const generatePassword = (length, allowNumbers, allowSChars) => {
    let alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*-_+.";

    let password = [];

    // Ensuring at least one number 
    if (allowNumbers) {
        alphaString += numbers;
        password.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }

    // Ensuring at least one special character 
    if (allowSChars) {
        alphaString += specialChars;
        password.push(specialChars.charAt(Math.floor(Math.random() * specialChars.length)));
    }

    while (password.length < length) {
        let randPos = Math.floor(Math.random() * alphaString.length);
        password.push(alphaString.charAt(randPos));
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
};

  const copyPass = (e) => {
    // window.navigator.clipboard.writeText(password);
    dispatch(setCoppiedPasswordSlice(password));
    inputPass.current.select();
    document.execCommand("copy");
    inputPass.current.setSelectionRange(0, length);

    !authStatus
      ? setMessage(
          <Link to="/login" className="text-sm font-semibold leading-6">
            <span className="text-sky-700">Log in &rarr;</span>To Save This
            Password
          </Link>
        )
      : setMessage(
          <Link to="/save-password" className="text-sm font-semibold leading-6">
            <span className="text-sky-700">Password Coppied!</span>
            <br />
            <span className="text-sky-700">Save this Password &rarr;</span>
          </Link>
        );
    setTimeout(() => {
      setMessage("");
    }, 6000);
  };

  return (
    <>
      {message && <Alert message={message} />}

      <h1 className="text-4xl font-bold text-center my-10">
        Password Generator
      </h1>
      <div className="flex justify-center select-none">
        <div className="flex w-[32rem] justify-center flex-col bg-gray-600 rounded py-8 px-3 lg:px-8">
          <div className="flex justify-center w-full mb-2 shadow-md shadow-gray-900">
            <textarea
              type="text"
              readOnly
              value={password}
              className="rounded h-24 lg:h-20 w-full pointer-finger bg-gray-100 text-gray-900 focus-visible:outline-0 ring-inset focus-visible:ring-2 ring-indigo-600 font-semibold p-3 resize-none"
              ref={inputPass}
            />
          </div>
          <div className="flex justify-evenly w-full m-2">
            <div className="flex justify-center w-full">
              <label htmlFor="length">Length:</label>
              <input
                type="range"
                id="length"
                min="8"
                max="72"
                value={length}
                className="w-3/6 mx-1"
                onChange={(e) => setLength(e.target.value)}
              />
              <span className="w-5">{length}</span>
              <PlusCircleIcon
                onClick={() => length < 72 && setLength(Number(length) + 1)}
                className="h-6 w-6 mx-1 cursor-pointer"
              />
              <MinusCircleIcon
                onClick={() => length > 8 && setLength(Number(length) - 1)}
                className="h-6 w-6 mx-1 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-evenly w-full m-2">
            <div className="flex items-center">
              <label htmlFor="numbers">Numbers:</label>
              <input
                type="checkbox"
                id="numbers"
                checked={allowNumbers}
                onChange={() => setAllowNumbers(!allowNumbers)}
                className="mx-1"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="sChars">Special Characters:</label>
              <input
                type="checkbox"
                id="sChars"
                checked={allowSChars}
                onChange={() => setAllowSChars(!allowSChars)}
                className="mx-1"
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <button
              onClick={copyPass}
              className="bg-gray-500 w-full text-gray-100 font-semibold focus-visible:outline-0 rounded p-2"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <Disclaimer />
    </>
  );
}

export default GeneratePassword;
