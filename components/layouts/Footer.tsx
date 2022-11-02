import { currentYear } from "../../libs/currentYear";

export function Footer() {
  console.log(currentYear);
  return (
    <footer className="p-3 flex items-center gap-3 justify-center">
      <p>©2022-{currentYear}</p>
      <p className="text-slate-700">kca2250</p>
    </footer>
  );
}
