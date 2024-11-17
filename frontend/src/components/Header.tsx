"use client";

import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/server-actions/header";

export default function Header() {
  const navigate = useRouter();
  const { user, setUser } = useUser();
  
  const handleLogout = () => {
    logout()
    setUser(null)
    return
  }

  return (
    <Card
      className={`fixed top-4 left-1/2 bg-background/95 transform -translate-x-1/2 z-50 flex justify-between items-center w-[calc(100%-1rem)] max-w-4xl p-4 transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg`}
    >
      <div className="flex gap-12 items-center pl-8">
        <Link href={"/#home"}>Home</Link>
        <Link href={"/#tours"}>Passeios</Link>
      </div>
      <div className="flex gap-4">
        {user?.isAdmin && (
          <Button onClick={() => navigate.push("/admin")} variant="ghost">
            Gerenciar
          </Button>
        )}
        {!user && (
          <Button onClick={() => navigate.push("/register")}>Cadastrar</Button>
        )}
        {user ? (
          <Button variant="outline" onClick={handleLogout}>Desconectar</Button>
        ) : (
          <Button onClick={() => navigate.push("/login")} variant="outline">
            Login
          </Button>
        )}
        <ToggleTheme />
      </div>
    </Card>
  );
}
