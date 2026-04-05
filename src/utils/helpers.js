export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const fmt = (s) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export const getTheme = () => ({
  bg: "#0d0d12",
  surf: "#15151e",
  border: "#22222e",
  faint: "#1a1a25",
  text: "#e6e2dc",
  muted: "#686460",
  dim: "#3a3a48",
  fontFamily: "'Helvetica', sans-serif",
});
