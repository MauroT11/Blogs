'use client'

import { useFormStatus } from "react-dom";

export default function FilterBtn() {
  const formStatus = useFormStatus();

  return (
    <button type="submit" disabled={formStatus.pending} className="bg-blue-700 text-white border-black border-[2px] rounded-lg py-1 px-2">
      {formStatus.pending ? "Loading..." : "Filter"}
    </button>
  );
}