import React from "react";
import { getTheme, fmt } from "../utils/helpers";
import { LABELS } from "../data/sections";

export default function QuizScreen({
  section,
  questions,
  currentIndex,
  mode,
  answers,
  chosen,
  revealed,
  timeLeft,
  timerPct,
  timerWarn,
  onOptionSelect,
  onNext,
  onBack,
}) {
  const T = getTheme();
  const { color, accent, name } = section;
  const q = questions[currentIndex];
  const pct = Math.round((currentIndex / questions.length) * 100);
  const canNext = mode === "practice" ? revealed : chosen !== null;

  if (!q) return null;

  const getStatusStyle = (i) => {
    if (!revealed && chosen !== i) return "idle";
    if (!revealed && chosen === i) return "sel";
    if (i === q.answerIndex) return "ok";
    if (i === chosen) return "bad";
    return "idle";
  };

  const optionStyles = {
    ok: { bg: "#041a0e", br: "#22c55e", tx: "#86efac" },
    bad: { bg: "#1c0404", br: "#ef4444", tx: "#fca5a5" },
    sel: { bg: `${accent}12`, br: accent, tx: T.text },
    idle: { bg: T.faint, br: T.border, tx: "#aca8a2" },
  };

  const badgeStyles = {
    ok: { bg: "#22c55e", br: "#22c55e", tx: "#041a0e" },
    bad: { bg: "#ef4444", br: "#ef4444", tx: "#fff" },
    sel: { bg: accent, br: accent, tx: "#fff" },
    idle: { bg: "transparent", br: T.dim, tx: "#555" },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: "Georgia,serif",
      }}
    >
      <div
        style={{ maxWidth: 700, margin: "0 auto", padding: "28px 22px 60px" }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: `1px solid ${T.border}`,
              color: T.muted,
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            ← Inicio
          </button>
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 3,
                borderRadius: 3,
                marginBottom: 5,
                background: `linear-gradient(90deg,${accent} ${pct}%,${T.faint} ${pct}%)`,
                transition: "background 0.3s",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: T.muted,
                fontFamily: "monospace",
              }}
            >
              <span>
                {currentIndex + 1} / {questions.length}
              </span>
              <span>
                {mode === "exam" ? "Examen cronometrado" : "Modo práctica"}
              </span>
            </div>
          </div>
          {mode === "exam" && (
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 700,
                minWidth: 46,
                textAlign: "right",
                color: timerWarn ? "#ef4444" : T.muted,
                transition: "color 0.3s",
              }}
            >
              {fmt(timeLeft)}
            </div>
          )}
        </div>

        {/* Timer progress for exam */}
        {mode === "exam" && (
          <div
            style={{
              height: 2,
              borderRadius: 2,
              marginBottom: 20,
              background: `linear-gradient(90deg,${timerWarn ? "#ef4444" : accent} ${timerPct}%,${T.faint} ${timerPct}%)`,
              transition: "background 0.5s",
            }}
          ></div>
        )}

        {/* Question card */}
        <div
          style={{
            background: T.surf,
            borderRadius: 18,
            padding: "26px 26px 22px",
            border: `1px solid ${T.border}`,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: accent,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            {name.toUpperCase()}
          </div>
          <div
            style={{ fontSize: 17, lineHeight: 1.8, whiteSpace: "pre-line" }}
          >
            {q.text}
          </div>
        </div>

        {/* Options */}
        {q.options.map((opt, i) => {
          const status = getStatusStyle(i);
          const oc = optionStyles[status];
          const bc = badgeStyles[status];
          return (
            <div
              key={i}
              onClick={() => onOptionSelect(i)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "13px 15px",
                borderRadius: 12,
                marginBottom: 8,
                cursor: revealed ? "default" : "pointer",
                border: `1px solid ${oc.br}`,
                background: oc.bg,
                color: oc.tx,
                fontSize: 14,
                lineHeight: 1.55,
                transition: "all 0.13s",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  minWidth: 26,
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  border: `1px solid ${bc.br}`,
                  background: bc.bg,
                  color: bc.tx,
                }}
              >
                {LABELS[i]}
              </span>
              <span>{opt}</span>
            </div>
          );
        })}

        {/* Feedback + explanation (practice mode only) */}
        {revealed && (
          <>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                marginBottom: 12,
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                fontSize: 13,
                background: chosen === q.answerIndex ? "#041a0e" : "#1c0404",
                border: `1px solid ${
                  chosen === q.answerIndex ? "#22c55e33" : "#ef444433"
                }`,
                color: chosen === q.answerIndex ? "#86efac" : "#fca5a5",
              }}
            >
              <span style={{ fontSize: 17 }}>
                {chosen === q.answerIndex ? "✓" : "✗"}
              </span>
              <span>
                {chosen === q.answerIndex
                  ? "¡Correcto!"
                  : `Correcta: ${LABELS[q.answerIndex]}) ${
                      q.options[q.answerIndex]
                    }`}
              </span>
            </div>
            <div
              style={{
                background: "#0a1828",
                border: "1px solid #1a3454",
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#4a90d9",
                  letterSpacing: 2,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                EXPLICACIÓN
              </div>
              <div style={{ fontSize: 13, color: "#93c5fd", lineHeight: 1.7 }}>
                {q.exp}
              </div>
            </div>
          </>
        )}

        {canNext && (
          <button
            onClick={onNext}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              letterSpacing: 0.3,
              background: `linear-gradient(135deg,${color},${color}bb)`,
              color: "#fff",
            }}
          >
            {currentIndex + 1 < questions.length
              ? "Siguiente →"
              : "Ver resultados"}
          </button>
        )}
      </div>
    </div>
  );
}
