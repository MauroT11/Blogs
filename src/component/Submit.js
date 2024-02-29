'use client'

import { useFormStatus } from "react-dom";

export default function Submit() {
  const formStatus = useFormStatus();

  return (
    <button type="submit" disabled={formStatus.pending} className="bg-blue-700 text-white border-black border-[2px] rounded-lg p-1">
      {formStatus.pending ? "Submitting..." : "Submit"}
    </button>
  );
}