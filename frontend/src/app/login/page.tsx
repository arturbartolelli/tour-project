"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "./actions";
import { isActionError } from "@/utils/error";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser()
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await loginUser(email, password)
      .then((res) => {
        if(isActionError(res)) {
          console.error(res)
        }
        if(!isActionError(res))
          setUser(res.data.user)

        toast("Login realizado!");
        router.push("/");
      })
      .catch((err) => {
        if (isActionError(err)) {
          toast("Erro de login");
        } else {
          toast("Erro inesperado");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle>Realize seu login</CardTitle>
          <CardDescription>Bem-vindo de volta!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button" onClick={() => router.push("/")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        <div className="text-center flex justify-center gap-2">
          Não possui conta?
          <Link href="/register" className="underline">
            Registrar-se
          </Link>
        </div>
      </Card>
    </div>
  );
}
