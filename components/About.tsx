import Image from "next/image";
import Profile from "../assets/about.jpg";

export const About = () => {
  return (
    <div className="bg-slate-300 p-4 my-4 rounded-lg">
      <div className="flex gap-5 items-start">
        <Image
          className="rounded-lg"
          width={50}
          height={50}
          src={Profile}
          alt="about-me-img"
        />
        <div>
          <h4 className="text-neutral-800 font-semibold">かと</h4>
          <small>javascript / typescript / React / Next.js</small>
        </div>
      </div>
    </div>
  );
};
