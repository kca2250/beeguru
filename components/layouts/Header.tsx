import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export function Header() {
  return (
    <header className="w-full py-2 px-3">
      <div className="flex items-center justify-between self-center gap-4">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">beeguru.dev</h1>
        </Link>
        <div className="flex items-center gap-2">
          <a href="https://twitter.com/kca2250">
            <FaTwitter className="text-[#00acee]" size="1.4em" />
          </a>
          <a href="https://github.com/kca2250">
            <FaGithub size="1.3em" />
          </a>
        </div>
      </div>
      <small>某金融系企業のフロントエンドエンジニアの備忘録</small>
    </header>
  );
}
