import React from "react";
import { getTheme } from "../utils/helpers";
import { SECTIONS } from "../data/sections";

export default function HomeScreen({ onStartQuiz }) {
  const T = getTheme();
  const totalQuestions = SECTIONS.reduce((n, s) => n + s.questions.length, 0);

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
        style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 80px" }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: 4,
            color: T.muted,
            marginBottom: 10,
            fontFamily: "monospace",
          }}
        >
          GUÍA DE PRÁCTICA
        </div>
        <h1
          style={{
            fontSize: "clamp(2.4rem,5vw,4rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 6,
          }}
        >
          Habilidad
          <br />
          Cognitiva
        </h1>
        <p
          style={{
            color: T.muted,
            marginBottom: 48,
            fontSize: 14,
            fontStyle: "italic",
          }}
        >
          PAEP — {totalQuestions} preguntas · 6 secciones
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(276px,1fr))",
            gap: 14,
          }}
        >
          {SECTIONS.map((s) => (
            <SectionCard
              key={s.id}
              section={s}
              onStartQuiz={onStartQuiz}
              theme={T}
            />
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: T.dim,
            fontSize: 12,
            marginTop: 44,
          }}
        >
          Práctica → retroalimentación inmediata + explicación · Examen →
          cronometrado, sin pistas
        </p>
      </div>
    </div>
  );
}

function SectionCard({ section, onStartQuiz, theme: T }) {
  const { color, accent, name, description, questions } = section;

  return (
    <div
      style={{
        background: T.surf,
        border: `1px solid ${T.border}`,
        borderRadius: 18,
        padding: "24px 22px 20px",
        borderTop: `3px solid ${color}`,
        transition: "all 0.16s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}55`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = T.border;
        e.currentTarget.style.transform = "";
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: `${color}1a`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: color,
          marginBottom: 14,
          fontFamily: "monospace",
        }}
      >
        {section.icon}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>
        {name}
      </div>
      <div
        style={{
          fontSize: 12,
          color: T.muted,
          lineHeight: 1.55,
          marginBottom: 16,
        }}
      >
        {description}
      </div>
      <div
        style={{
          fontSize: 11,
          color: T.dim,
          marginBottom: 16,
          fontFamily: "monospace",
        }}
      >
        {questions.length} preguntas · hasta 15 por sesión
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          ["Práctica", "practice", true],
          ["Examen ⏱", "exam", false],
        ].map(([lbl, mode, isPrimary]) => (
          <button
            key={mode}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 9,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${isPrimary ? color : T.border}`,
              background: isPrimary ? `${color}1a` : "transparent",
              color: isPrimary ? color : T.muted,
              transition: "all 0.14s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${accent}28`;
              e.currentTarget.style.color = accent;
              e.currentTarget.style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isPrimary
                ? `${color}1a`
                : "transparent";
              e.currentTarget.style.color = isPrimary ? color : T.muted;
              e.currentTarget.style.borderColor = isPrimary ? color : T.border;
            }}
            onClick={() => onStartQuiz(section, mode)}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}
