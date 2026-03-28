import { useState, useEffect, useCallback, useRef } from "react";

const TIME_PER_Q = 30;

export const useQuizTimer = (screen, mode, questionsLength) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [expired, setExpired] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen !== "quiz" || mode !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, mode]);

  const initializeTimer = useCallback((qs) => {
    setTimeLeft(qs.length * TIME_PER_Q);
    setExpired(false);
  }, []);

  return {
    timeLeft,
    setTimeLeft,
    expired,
    setExpired,
    timerRef,
    initializeTimer,
  };
};

export const useQuizState = (section) => {
  const [qs, setQs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [chosen, setChosen] = useState(null);
  const [revealed, setRevealed] = useState(false);

  return {
    qs,
    setQs,
    idx,
    setIdx,
    answers,
    setAnswers,
    chosen,
    setChosen,
    revealed,
    setRevealed,
  };
};
