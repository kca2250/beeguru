import { FaGithub, FaTwitter } from "react-icons/fa";

export function Header() {
  return (
    <header className="w-full py-2 px-4 bg-neutral-800 flex items-center self-center justify-between">
      <h1 className="font-bold text-xl text-white">beeguru.dev</h1>
      <div className="flex gap-4">
        <a className="text-[#00acee]" href="https://twitter.com/kca2250">
          <FaTwitter size="1.5em" />
        </a>
        <a className="text-white" href="https://github.com/kca2250">
          <FaGithub size="1.5em" />
        </a>
      </div>
    </header>
  );
}
