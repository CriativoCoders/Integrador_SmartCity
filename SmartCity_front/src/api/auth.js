import jwt_decode from "jwt-decode";

// Verifica se o token expirou
export function isTokenExpired(token) {
  if (!token) return true;
  const { exp } = jwt_decode(token);
  return Date.now() >= exp * 1000;
}

// Retorna o access_token, renovando se necessário
export async function getToken() {
  let token = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  if (!token || isTokenExpired(token)) {
    // Tenta renovar
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) throw new Error("Falha ao renovar token.");

      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      token = data.access;
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  }

  return token;
}
