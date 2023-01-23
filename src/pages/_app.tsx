import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import NavBar from "../components/NavBar";
import React, { useState, createContext } from "react";
import { type MemoType } from "../types/types";
import { env } from "../env/client.mjs";
import GetUser from "../components/GetUser";
import { createClient } from "@supabase/supabase-js";

export const DataContext = createContext<MemoType | undefined | null>(null);

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [user, setUser] = useState(null);
  const [create, setCreate] = useState(false);
  const [status, setStatus] = useState("");
  const supabase = createClient("https://" + env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY);

  const value = React.useMemo(() => {
    return {
      user,
      supabase,
    };
  }, [user, supabase]);

  return (
    <SessionProvider session={session}>
      {status === "authenticated" || status === "unauthenticated" ? (
        <>
          <GetUser user={user} setUser={setUser} status={status} setStatus={setStatus} enabled={false} />
          <DataContext.Provider value={value}>
            <NavBar user={user} create={create} setCreate={setCreate} />
            <Component {...pageProps} />
          </DataContext.Provider>
        </>
      ) : (
        <GetUser user={user} setUser={setUser} status={status} setStatus={setStatus} enabled={true} />
      )}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
