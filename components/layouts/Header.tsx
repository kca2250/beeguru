import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export function Header() {
  return (
    <header className="w-full py-2 px-3">
      <div className="flex items-center justify-between self-center gap-4">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">beeguru.dev</h1>
        </Link>
      </div>
      <small>某フロントエンドエンジニアの備忘録</small>
    </header>
  );
}
