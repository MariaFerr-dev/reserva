import { ReactNode } from "react";
import { getCurrentUser } from "../../lib/auth";

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    return <div className="max-w-3xl mx-auto px-6 py-12">Necesitas iniciar sesión para continuar.</div>;
  }

  return <>{children}</>;
}
