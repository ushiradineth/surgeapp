import React, { useState, useEffect, useRef } from "react";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { env } from "../env/client.mjs";
import Head from "next/head.js";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Auth = () => {
  const [loginMenu, setLoginMenu] = useState(true);
  const [errorState, setErrorState] = useState("");
  const createUser = api.user.createUser.useMutation({ onError: (err) => setErrorState(err.message) });
  const router = useRouter();
  const [isVerified, setisVerified] = useState(false);
  const captchaRef = React.useRef(null);

  useEffect(() => {
    if (errorState !== "") setErrorState("");
  }, [loginMenu]);

  const inputStyling = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline";

  const LoginMenu = () => {
    const [formData, setFormData] = useState<{ email: string; password: string }>({ email: "", password: "" });
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    const { email, password } = formData;

    const onChange = (e: { target: { name: any; value: any } }) => {
      if (e.target.name === "email") {
        const bState = z.string().email().safeParse(e.target.value);

        if (emailValidation !== bState.success) {
          setEmailValidation(bState.success);
        }
      }

      if (e.target.name === "password") {
        const bState = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/.test(e.target.value);

        if (passwordValidation !== bState) {
          setPasswordValidation(bState);
        }
      }

      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const onSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const loginQuery = await signIn("credentials", { email, password, redirect: false });
      loginQuery?.error && setErrorState("Invalid Credentials");
    };

    return (
      <form className="mt-3 grid gap-3 pt-3 text-center md:w-auto lg:w-auto" onSubmit={onSubmit}>
        <input type="email" name="email" id="email" placeholder="Email" className={inputStyling} onChange={onChange} />
        <input type="password" name="password" id="password" placeholder="Password" minLength={8} maxLength={20} className={inputStyling} onChange={onChange} />
        <HCaptcha ref={captchaRef} sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY} onVerify={() => setisVerified(true)} />
        <button type="submit" disabled={!emailValidation || !passwordValidation || !isVerified} className="focus:shadow-outline w-full rounded bg-blue-500 py-3 px-3 font-bold text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-300">
          Login
        </button>
      </form>
    );
  };

  const RegisterMenu = () => {
    const [formData, setFormData] = useState<{ name: string; email: string; password: string }>({ name: "", email: "", password: "" });
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);

    const onChange = (e: { target: { name: any; value: any } }) => {
      if (e.target.name === "email") {
        const bState = z.string().email().safeParse(e.target.value);

        if (emailValidation !== bState.success) {
          setEmailValidation(bState.success);
        }
      }

      if (e.target.name === "password") {
        const bState = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/.test(e.target.value);

        if (passwordValidation !== bState) {
          setPasswordValidation(bState);
        }
      }

      if (e.target.name === "name") {
        const bState = z.string().min(1).max(100).safeParse(e.target.value);

        if (nameValidation !== bState.success) {
          setNameValidation(bState.success);
        }
      }

      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const onSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      createUser.mutate(formData);
    };

    return (
      <form className="mt-3 grid gap-3 pt-3 text-center md:w-auto lg:w-auto" onSubmit={onSubmit}>
        <input type="text" name="name" id="name" placeholder="Name" minLength={1} maxLength={100} className={inputStyling} onChange={onChange} />
        <input type="email" name="email" id="email" placeholder="Email" className={inputStyling} onChange={onChange} />
        <input type="password" name="password" id="password" placeholder="Password" minLength={8} maxLength={20} className={inputStyling} onChange={onChange} />
        <p className="font-semibold text-red-400">{errorState}</p>
        <button type="submit" disabled={!emailValidation || !nameValidation} className="focus:shadow-outline w-full rounded bg-blue-500 py-3 px-3 font-bold text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-300">
          Register
        </button>
      </form>
    );
  };

  return (
    <>
      <Head>
        <title>{loginMenu ? "Login to SurgeApp!" : "Register to SurgeApp!"}</title>
        <meta name="description" content="SurgeApp by Ushira Dineth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid-rows-12 grid h-screen w-screen grid-flow-row lg:grid-flow-col lg:grid-cols-12">
        <div className="grid place-items-center bg-zinc-700 font-mono text-lg font-semibold text-gray-300 lg:col-span-4 lg:col-start-9 lg:row-span-2 ">
          <p>Surge SE Intership</p>
          <p>March 2023</p>
          <p>Ushira Dineth</p>
        </div>
        <div className="row-span-6 grid place-items-center lg:col-span-8 lg:col-start-1 lg:row-span-2">
          <div className="flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-white">
            <div className="flex h-12 w-full select-none items-center justify-center font-semibold text-black">
              <div className={"flex h-12 w-[50%] cursor-pointer items-center justify-center " + (!loginMenu && " rounded-br-md rounded-tl-md border-b border-r bg-gray-100 ")} onClick={() => setLoginMenu(true)}>
                Login
              </div>
              <div className={"flex h-12 w-[50%] cursor-pointer items-center justify-center " + (loginMenu && " rounded-bl-md rounded-tr-md border-b border-l bg-gray-100 ")} onClick={() => setLoginMenu(false)}>
                Register
              </div>
            </div>
            <section className="w-[350px] rounded px-6 pb-6 pt-2 shadow-md">
              {loginMenu ? <LoginMenu /> : <RegisterMenu />}
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink select-none text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <button className="mb-2 flex  w-full select-none items-center justify-center gap-2 rounded-full bg-gray-300 px-8 py-3 font-semibold text-black no-underline transition hover:bg-gray-200" onClick={() => signIn("github", { callbackUrl: env.NEXT_PUBLIC_NEXTAUTH_URL })}>
                <AiFillGoogleCircle size={30} /> Continue with Google
              </button>
              <button className="flex w-full select-none items-center justify-center gap-2 rounded-full bg-gray-300 px-8 py-3 font-semibold text-black no-underline transition hover:bg-gray-200" onClick={() => signIn("github", { callbackUrl: env.NEXT_PUBLIC_NEXTAUTH_URL })}>
                <AiFillGithub size={30} /> Continue with GitHub
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
