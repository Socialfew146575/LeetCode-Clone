"use client";

import { authModalState } from "@/atoms/authModalAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "../../firebase/firebase";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const router = useRouter();

  const [authState, setAuthState] = useRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.password || !inputs.email) {
      return toast.error("Please fill all the fields", {
        className: "relative bottom-[120px]",
      });
    }

    try {
      await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
 
    if (error) {
      toast.error(error.message, {
        duration: 4000, // Adjust the duration as needed
        className: "relative bottom-[120px]",
      });

      setInputs({
        email: "",

        password: "",
      });
    }
  }, [error]);

  return (
    <form action="" className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
      <h3 className="text-cl font-medium text-white">Sign in to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={inputs.email}
          className="border-2 border-white outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white  placeholder-gray-400 text-gray-600"
          placeholder="name@company.com"
          onChange={handleChange}
        />
      </div>{" "}
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={inputs.password}
          className="border-2 border-white outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white placeholder-gray-400 text-gray-600"
          placeholder="********"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Verifying credentials..." : "Login"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() =>
          setAuthState((prev) => ({ ...prev, type: "forgotPassword" }))
        }
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300">
        Not Registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() =>
            setAuthState((prev) => ({ ...prev, type: "register" }))
          }
        >
          Create account.
        </a>
      </div>
      <Toaster />
    </form>
  );
};
export default Login;
