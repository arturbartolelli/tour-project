import * as React from "react";
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

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle>Realize seu login</CardTitle>
          <CardDescription>Bem-vindo de volta!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Digite seu email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Digite sua senha" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Login</Button>
        </CardFooter>
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
