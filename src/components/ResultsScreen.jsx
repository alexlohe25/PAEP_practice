import React, { useState } from "react";
import { getTheme } from "../utils/helpers";
import { LABELS } from "../data/sections";

export default function ResultsScreen({
  section,
  questions,
  answers,
  mode,
  expired,
  onRetry,
  onSwitchMode,
  onHome,
}) {
  const T = getTheme();
  const { color, accent, name } = section;
  const score = questions.filter((q) => answers[q.id] === q.answerIndex).length;
  const total = questions.length;
  const pct = total ? Math.round((score / total) * 100) : 0;
  const grade =
    pct >= 80
      ? "Excelente"
      : pct >= 60
        ? "Bien"
        : pct >= 40
          ? "Regular"
          : "Sigue practicando";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: T.fontFamily,
      }}
    >
      <div
        style={{ maxWidth: 660, margin: "0 auto", padding: "48px 22px 80px" }}
      >
        {expired && (
          <div
            style={{
              background: "#1c0404",
              border: "1px solid #ef444433",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 32,
              color: "#fca5a5",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            ⏱ Tiempo agotado — el examen terminó automáticamente.
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: T.muted,
              marginBottom: 24,
            }}
          >
            {name.toUpperCase()} · {mode === "exam" ? "EXAMEN" : "PRÁCTICA"}
          </div>
          <div
            style={{
              width: 132,
              height: 132,
              borderRadius: "50%",
              border: `3px solid ${accent}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <span
              style={{
                fontSize: 46,
                fontWeight: 800,
                color: accent,
                lineHeight: 1,
              }}
            >
              {score}
            </span>
            <span style={{ fontSize: 13, color: T.muted }}>de {total}</span>
          </div>
          <div style={{ fontSize: 34, marginBottom: 8 }}>
            {pct >= 80 ? "🎉" : pct >= 60 ? "👍" : pct >= 40 ? "📚" : "💪"}
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: accent,
              marginBottom: 6,
            }}
          >
            {grade}
          </h2>
          <p style={{ color: T.muted }}>{pct}% de aciertos</p>
        </div>

        {/* Score bar */}
        <div
          style={{
            background: T.surf,
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 36,
            border: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: T.muted,
              marginBottom: 8,
            }}
          >
            <span>✓ Correctas: {score}</span>
            <span>✗ Incorrectas: {total - score}</span>
          </div>
          <div
            style={{
              height: 5,
              borderRadius: 4,
              background: T.faint,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 4,
                width: `${pct}%`,
                background: `linear-gradient(90deg,${accent},${color})`,
                transition: "width 0.7s",
              }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 52,
          }}
        >
          {[
            ["Reintentar", onRetry, true],
            [
              mode === "exam" ? "Modo Práctica" : "Modo Examen ⏱",
              onSwitchMode,
              false,
            ],
            ["Inicio", onHome, false],
          ].map(([lbl, fn, primary]) => (
            <button
              key={lbl}
              onClick={fn}
              style={{
                padding: "12px 26px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                border: `1px solid ${primary ? accent : T.border}`,
                background: primary ? `${color}cc` : "transparent",
                color: primary ? "#fff" : T.muted,
              }}
            >
              {lbl}
            </button>
          ))}
        </div>

        {/* Detailed review */}
        <div
          style={{
            fontSize: 10,
            color: T.muted,
            letterSpacing: 3,
            marginBottom: 14,
          }}
        >
          REVISIÓN DETALLADA
        </div>
        {questions.map((q, i) => (
          <QuestionReview
            key={q.id}
            question={q}
            userAnswer={answers[q.id]}
            index={i}
            theme={T}
          />
        ))}
      </div>
    </div>
  );
}

function QuestionReview({ question, userAnswer, index, theme: T }) {
  const [open, setOpen] = useState(false);
  const isCorrect = userAnswer === question.answerIndex;

  return (
    <div
      style={{
        padding: "14px 15px",
        borderRadius: 12,
        marginBottom: 8,
        background: isCorrect ? "#041a0e" : "#1c0404",
        border: `1px solid ${isCorrect ? "#22c55e1a" : "#ef44441a"}`,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          color: isCorrect ? "#22c55e" : "#ef4444",
          fontWeight: 700,
          minWidth: 18,
          fontSize: 15,
        }}
      >
        {isCorrect ? "✓" : "✗"}
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            color: isCorrect ? "#4ade80" : "#f87171",
            marginBottom: 4,
            lineHeight: 1.4,
          }}
        >
          #{index + 1} — {question.text.split("\n")[0].slice(0, 62)}
          {question.text.length > 62 ? "…" : ""}
        </div>
        {!isCorrect && (
          <div
            style={{
              fontSize: 12,
              color: "#fca5a5",
              marginBottom: 8,
              lineHeight: 1.45,
            }}
          >
            Tu respuesta:{" "}
            {userAnswer !== undefined
              ? `${LABELS[userAnswer]}) ${question.options[userAnswer]}`
              : "Sin respuesta"}
            {" · "}
            Correcta: {LABELS[question.answerIndex]}){" "}
            {question.options[question.answerIndex]}
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "none",
            border: `1px solid ${isCorrect ? "#22c55e44" : "#ef444444"}`,
            borderRadius: 6,
            padding: "3px 10px",
            fontSize: 11,
            cursor: "pointer",
            color: isCorrect ? "#4ade80" : "#f87171",
          }}
        >
          {open ? "Ocultar explicación" : "Ver explicación"}
        </button>
        {open && (
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              color: "#93c5fd",
              lineHeight: 1.7,
              background: "#0a1828",
              borderRadius: 8,
              padding: "10px 13px",
            }}
          >
            {question.exp}
          </div>
        )}
      </div>
    </div>
  );
}
