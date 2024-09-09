# Projeto de Passeios Turísticos
## By Artur Bartolelli & Vitor Vargas
Este é um projeto Fullstack de uma empresa de **Passeios Turísticos**, criado com **Next.js** e **React** (utilizando o framework **shadcn** para componentes) no front-end, e **Go** como back-end. O objetivo do projeto é proporcionar uma experiência de reserva e agendamento de passeios turísticos através de uma plataforma web, com funcionalidades de cadastro de clientes, visualização de passeios, e integração com o back-end para gerenciamento de dados.

## Tecnologias Utilizadas

### Frontend
- **Next.js**: Framework React para renderização híbrida (SSR/SSG) e navegação entre páginas.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Shadcn**: Sistema de design para componentes de UI, proporcionando uma interface elegante e moderna.
- **TypeScript**: Adiciona tipagem estática ao projeto, aumentando a segurança e a produtividade no desenvolvimento.
- **Tailwind CSS**: Framework utilitário de CSS para estilização rápida e responsiva.

### Backend
- **Go**: Linguagem de programação do back-end para fornecer APIs RESTful robustas e escaláveis.
- **Gin**: Framework para criação de servidores HTTP em Go, ideal para construção de APIs.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar informações de passeios, clientes, e reservas.

## Funcionalidades Principais

- **Visualização de Passeios**: O usuário pode navegar pelos passeios disponíveis com descrições, imagens e preços.
- **Reserva de Passeios**: Os clientes podem se cadastrar e reservar passeios diretamente na plataforma.
- **Autenticação**: Implementação de sistema de login e cadastro para usuários.
- **Painel Administrativo**: Área para os administradores gerenciarem os passeios, clientes e reservas.
- **API RESTful**: O back-end, em Go, expõe uma API para o gerenciamento dos dados, conectando o front-end com o banco de dados.

## Instalação

### Frontend

1. Clone o repositório e navegue até o diretório do front-end:

```bash
git clone (link)
cd tour-project/frontend
npm run dev


