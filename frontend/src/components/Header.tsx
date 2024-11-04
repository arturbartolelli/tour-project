import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="text-xl uppercase">Turistando Ceará</div>
      <div className="flex gap-8 items-center uppercase">
        <div className="">
          <Link href={'#tours'}>Passeios</Link>
        </div>
        <div className="">
          <Link href={'#about'}>Sobre</Link>
        </div>
        <ToggleTheme />
      </div>
    </div>
  );
}
