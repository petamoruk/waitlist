"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WaitlistState {
  email: string;
  setEmail: (v: string) => void;
  isSubscribed: boolean;
  setIsSubscribed: (v: boolean) => void;
}

const Ctx = createContext<WaitlistState>({
  email: "",
  setEmail: () => {},
  isSubscribed: false,
  setIsSubscribed: () => {},
});

export function WaitlistEmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <Ctx.Provider value={{ email, setEmail, isSubscribed, setIsSubscribed }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWaitlistEmail() {
  return useContext(Ctx);
}
