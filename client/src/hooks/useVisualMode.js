import { useState } from "react";

export default function useVisualMode(state) {
  const [mode, setMode] = useState(state || null);
  const [history, setHistory] = useState([state]);

  function transition(nextMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
    // console.log("Transition -> History:", history);

    setMode(nextMode);
    // console.log("Transition -> Mode: ", mode);
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 1]);
      // console.log("Back -> Mode: ", mode);
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      // console.log("Back -> History:", history);
    } else return;
  }

  return { mode, transition, back, history };
}
