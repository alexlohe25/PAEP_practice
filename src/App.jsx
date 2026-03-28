import { useState, useCallback } from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import { shuffle } from "./utils/helpers";
import { useQuizTimer, useQuizState } from "./hooks/useQuiz";
import { SECTIONS } from "./data/sections";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [sec, setSec] = useState(null);
  const [mode, setMode] = useState("practice");
  const quiz = useQuizState();
  const timer = useQuizTimer(screen, mode, quiz.qs.length);

  const startQuiz = useCallback(
    (section, m) => {
      const picked = shuffle(section.questions).slice(
        0,
        Math.min(15, section.questions.length),
      );
      setSec(section);
      setMode(m);
      quiz.setQs(picked);
      quiz.setIdx(0);
      quiz.setAnswers({});
      quiz.setChosen(null);
      quiz.setRevealed(false);
      timer.setExpired(false);
      if (m === "exam") {
        timer.initializeTimer(picked);
      }
      setScreen("quiz");
    },
    [quiz, timer],
  );

  const handleOptionSelect = (i) => {
    if (quiz.revealed) return;
    if (mode === "exam") {
      quiz.setChosen(i);
      return;
    }
    quiz.setChosen(i);
    quiz.setRevealed(true);
    quiz.setAnswers((a) => ({ ...a, [quiz.qs[quiz.idx]?.id]: i }));
  };

  const handleNext = () => {
    if (mode === "exam" && quiz.chosen !== null)
      quiz.setAnswers((a) => ({
        ...a,
        [quiz.qs[quiz.idx]?.id]: quiz.chosen,
      }));
    if (quiz.idx + 1 < quiz.qs.length) {
      quiz.setIdx((i) => i + 1);
      quiz.setChosen(null);
      quiz.setRevealed(false);
    } else {
      clearInterval(timer.timerRef.current);
      setScreen("results");
    }
  };

  const handleBack = () => {
    clearInterval(timer.timerRef.current);
    setScreen("home");
  };

  const handleRetry = () => {
    startQuiz(sec, mode);
  };

  const handleSwitchMode = () => {
    startQuiz(sec, mode === "exam" ? "practice" : "exam");
  };

  const handleHome = () => {
    setScreen("home");
  };

  const q = quiz.qs[quiz.idx];
  const score = quiz.qs.filter(
    (q) => quiz.answers[q?.id] === q?.answerIndex,
  ).length;
  const timerPct = quiz.qs.length
    ? (timer.timeLeft / (quiz.qs.length * 30)) * 100
    : 100;
  const timerWarn = timerPct < 25;

  // Handle exam time expiration
  if (timer.expired && screen === "quiz") {
    setScreen("results");
  }

  if (screen === "home") {
    return <HomeScreen onStartQuiz={startQuiz} />;
  }

  if (screen === "quiz" && sec && q) {
    return (
      <QuizScreen
        section={sec}
        questions={quiz.qs}
        currentIndex={quiz.idx}
        mode={mode}
        answers={quiz.answers}
        chosen={quiz.chosen}
        revealed={quiz.revealed}
        timeLeft={timer.timeLeft}
        timerPct={timerPct}
        timerWarn={timerWarn}
        onOptionSelect={handleOptionSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    );
  }

  if (screen === "results" && sec) {
    return (
      <ResultsScreen
        section={sec}
        questions={quiz.qs}
        answers={quiz.answers}
        mode={mode}
        expired={timer.expired}
        onRetry={handleRetry}
        onSwitchMode={handleSwitchMode}
        onHome={handleHome}
      />
    );
  }

  return null;
}
