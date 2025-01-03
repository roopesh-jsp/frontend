import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { backendUrl, token, setToken } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, password);

    try {
      if (state === "signup") {
        const { data } = await axios.post(backendUrl + "/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center gap-3 mt-10 border px-10 py-5 w-fit mx-auto justify-center rounded-md shadow-md">
      <h1>{state === "signup" ? "Sign up" : "login"}</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {state === "signup" && (
          <input
            className="border border-gray-300 p-2 rounded-md  w-[300px]"
            type="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="border border-gray-300 p-2 rounded-md w-[300px]"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded-md w-[300px]"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-400  px-10 py-2 font-bold text-stone-100 rounded-md">
          {" "}
          {state === "signup" ? "Sign up" : "login"}
        </button>
        {state === "signup" ? (
          <p className="text-center font-extralight text-sm">
            already have a account ?{" "}
            <span
              onClick={() => setState("login")}
              className="cursor-pointer text-blue-500 font-semibold underline"
            >
              login
            </span>
          </p>
        ) : (
          <p className="text-center font-extralight text-sm">
            did't have a account ?{" "}
            <span
              onClick={() => setState("signup")}
              className="cursor-pointer text-blue-500 font-semibold underline"
            >
              signup
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
