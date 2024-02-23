"use client";
import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const router = useRouter();
  const [authState, setAuthState] = useRecoilState(authModalState);

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.password || !inputs.displayName || !inputs.email) {
      return toast.error("Please fill all the fields", {
        className: "relative bottom-[120px]",
      });
    }

    try {
      const loadingToast = toast.loading("Creating your account", {
        className: "relative bottom-[120px]",
      });

      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) return;

      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        likedProblem: [],
        dislikedProblem: [],
        solvedProblem: [],
        starredProblems: [],
      };

      await setDoc(doc(firestore, "users", newUser?.user.uid), userData);

      if (newUser) router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss();
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
        displayName: "",
        password: "",
      });
    }
  }, [error]);

  return (
    <form action="" className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
      <h3 className="text-cl font-medium text-white">Register to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={inputs.email}
          className="border-2 border-white outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white  placeholder-gray-400 text-gray-600"
          placeholder="name@company.com"
          onChange={handleChangeInput}
        />
      </div>{" "}
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          type="displayName"
          name="displayName"
          id="displayName"
          value={inputs.displayName}
          className="border-2 border-white outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white  placeholder-gray-400 text-gray-600"
          placeholder="johnDoe"
          onChange={handleChangeInput}
        />
      </div>{" "}
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={inputs.password}
          className="border-2 border-white outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white placeholder-gray-400 text-gray-600"
          placeholder="********"
          onChange={handleChangeInput}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div
        className="text-sm font-medium text-gray-300"
        onClick={() => setAuthState((prev) => ({ ...prev, type: "login" }))}
      >
        Already have an account?{" "}
        <a href="#" className="text-blue-700 hover:underline">
          Log In
        </a>
      </div>
      <Toaster />
    </form>
  );
};
export default Signup;
