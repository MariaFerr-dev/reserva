"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""
  );

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Iniciar sesión</h1>
      <form action="/api/auth/login" method="post" className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Correo electrónico</span>
          <input
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Contraseña</span>
          <input
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        {error && <p className="text-red-400">{error}</p>}
        <button type="submit" className="btn-primary w-full py-3">
          Entrar
        </button>
      </form>
    </main>
  );
}
