import { useState } from "react";

interface AISuggestButtonProps {
  label?: string;
}

const AISuggestButton = ({ label = "AI Suggest" }: AISuggestButtonProps) => {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleClick = () => {
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 1500);
    }, 1500);
  };

  return (
    <button className="ai-suggest-btn mt-2" onClick={handleClick} disabled={state !== "idle"}>
      {state === "idle" && (
        <>
          <span>✨</span> {label}
        </>
      )}
      {state === "loading" && <span className="animate-pulse">✨ Generating...</span>}
      {state === "done" && <span>✅ Suggested!</span>}
    </button>
  );
};

export default AISuggestButton;
