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

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] p-4">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Bem-vindo ao Turistando Ceará!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" type="text" placeholder="Digite seu nome completo" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Digite seu email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Crie uma senha" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Cadastrar</Button>
        </CardFooter>
        <div className="text-center mt-4">
          Já possui uma conta? 
          <Link href="/login" className="underline ml-1">
            Entrar
          </Link>
        </div>
      </Card>
    </div>
  );
}
