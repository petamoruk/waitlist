"use client";

import { useState } from "react";

const PETS = ["🐶 Dog", "🐱 Cat", "🐰 Rabbit", "🐦 Bird", "Other"];

export default function PetChips() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-5 animate-fade-up-5">
      <span className="text-[12px] text-[#9E9E9E] mr-1">I have a</span>
      {PETS.map((pet) => (
        <button
          key={pet}
          onClick={() => setSelected(pet === selected ? null : pet)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[13px] font-medium transition-all duration-150 cursor-pointer"
          style={{
            borderWidth: "1.5px",
            borderColor: selected === pet ? "var(--pink)" : "var(--border)",
            background: selected === pet ? "var(--pink-light)" : "#fff",
            color: selected === pet ? "var(--pink)" : "var(--text-sec)",
          }}
        >
          {pet}
        </button>
      ))}
    </div>
  );
}