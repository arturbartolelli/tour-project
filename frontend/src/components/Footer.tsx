import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="container mx-auto flex justify-between items-center gap-4 border-t pt-4">
        <h2 className="text-lg font-semibold uppercase">Turistando Ceará</h2>
        
        <div className="flex gap-6">
          <a href="#" aria-label="Facebook" className="hover:text-blue-500">
            <Facebook size={24} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500">
            <Instagram size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <Twitter size={24} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-red-500">
            <Youtube size={24} />
          </a>
        </div>

        <p className="text-sm mt-2">
          By Artur Bartolelli e Vitor Vargas
        </p>
      </div>
    </footer>
  );
}
