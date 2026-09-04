// Mirrors the `/secret` route in thomas-starter-server's src/app.ts.
const SECRET_MESSAGES = ["olo refrigidigerators ", "wah wah"] as const;

function localSecretMessage(): string {
  return Math.random() < 0.5 ? SECRET_MESSAGES[0] : SECRET_MESSAGES[1];
}

export async function fetchSecretMessage(): Promise<string> {
  // The site is deployed as a static SPA with no backend, so in production
  // there's no server to hit — reproduce its logic locally instead.
  if (!import.meta.env.DEV) {
    return localSecretMessage();
  }

  const url = import.meta.env.VITE_SECRET_URL ?? "http://localhost:8080/secret";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`status ${res.status}`);
  return res.text();
}
