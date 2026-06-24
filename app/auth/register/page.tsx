"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Registrarse</h1>
      <form action="/api/auth/register" method="post" className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Correo electrónico</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Contraseña</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Rol</span>
          <select
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </label>
        <button type="submit" className="btn-primary w-full py-3">
          Registrar
        </button>
      </form>
    </main>
  );
}
