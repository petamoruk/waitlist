"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WaitlistState {
  email: string;
  setEmail: (v: string) => void;
  isSubscribed: boolean;
  setIsSubscribed: (v: boolean) => void;
  selectedPet: string | null;
  setSelectedPet: (v: string | null) => void;
}

const Ctx = createContext<WaitlistState>({
  email: "",
  setEmail: () => {},
  isSubscribed: false,
  setIsSubscribed: () => {},
  selectedPet: null,
  setSelectedPet: () => {},
});

export function WaitlistEmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  return (
    <Ctx.Provider value={{ email, setEmail, isSubscribed, setIsSubscribed, selectedPet, setSelectedPet }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWaitlistEmail() {
  return useContext(Ctx);
}
